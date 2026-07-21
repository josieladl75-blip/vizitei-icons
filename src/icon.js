import { getURL } from './cdn.js';
import { config } from './config.js';

export function createImage(name, size = 64) {
    const img = document.createElement('img');
    img.src = getURL(name, 'png');
    img.alt = name;
    img.width = size;
    img.height = size;
    if (config.lazy) {
        img.loading = 'lazy';
    }
    return img;
}

export function createSVG(name, size = 64) {
    const object = document.createElement('object');
    object.data = getURL(name, 'svg');
    object.type = 'image/svg+xml';
    object.width = size;
    object.height = size;
    return object;
}

export function createPicture(name, size = 64) {
    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.srcset = getURL(name, 'svg');
    source.type = 'image/svg+xml';
    const img = createImage(name, size);
    picture.appendChild(source);
    picture.appendChild(img);
    return picture;
}

export function render(element, name, options = {}) {
    if (!element || !name) return;
    
    const { type = 'png', size = 64, lazy = true } = options;
    
    let iconElement;
    if (type === 'svg') {
        iconElement = createSVG(name, size);
    } else {
        iconElement = createImage(name, size);
    }
    
    if (lazy && config.lazy) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.appendChild(iconElement);
                    observer.unobserve(element);
                }
            });
        });
        observer.observe(element);
    } else {
        element.appendChild(iconElement);
    }
    
    return iconElement;
}