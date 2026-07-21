import { getURL } from './cdn.js';
import { config } from './config.js';

class ViziteiIcon extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'type', 'size', 'rounded', 'shadow', 'lazy'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._observer = null;
    }

    connectedCallback() {
        this.render();
        this.setupObserver();
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.unobserve(this);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    setupObserver() {
        if (this.getAttribute('lazy') !== null) {
            this._observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadIcon();
                        this._observer.unobserve(this);
                    }
                });
            });
            this._observer.observe(this);
        } else {
            this.loadIcon();
        }
    }

    loadIcon() {
        const name = this.getAttribute('name') || 'clima';
        const type = this.getAttribute('type') || 'png';
        const size = this.getAttribute('size') || '64';
        const rounded = this.hasAttribute('rounded');
        const shadow = this.hasAttribute('shadow');

        const url = getURL(name, type);
        const img = document.createElement('img');
        img.src = url;
        img.alt = name;
        img.width = size;
        img.height = size;
        img.style.display = 'block';
        
        if (rounded) img.style.borderRadius = '12px';
        if (shadow) img.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))';

        const container = this.shadowRoot.querySelector('.icon-container') || document.createElement('div');
        container.className = 'icon-container';
        container.innerHTML = '';
        container.appendChild(img);
        
        if (!this.shadowRoot.contains(container)) {
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.createStyles());
            this.shadowRoot.appendChild(container);
        }
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: inline-block;
                line-height: 0;
            }
            .icon-container img {
                display: block;
                transition: transform 0.2s ease;
            }
            .icon-container img:hover {
                transform: scale(1.05);
            }
        `;
        return style;
    }

    render() {
        this.loadIcon();
    }
}

if (!customElements.get('vz-icon')) {
    customElements.define('vz-icon', ViziteiIcon);
}

export { ViziteiIcon };