import { CDN_BASES, DEFAULT_REPO, DEFAULT_PROJECT, DEFAULT_BRANCH } from './constants.js';

class Config {
    constructor() {
        this.cdn = 'raw';
        this.repo = DEFAULT_REPO;
        this.project = DEFAULT_PROJECT;
        this.branch = DEFAULT_BRANCH;
        this.lazy = true;
        this.cache = true;
        this.debug = false;
        this.theme = 'auto';
        this.hooks = {
            beforeLoad: [],
            afterLoad: [],
            beforeRender: [],
            afterRender: []
        };
    }

    get baseURL() {
        const base = CDN_BASES[this.cdn] || CDN_BASES.raw;
        return `${base}/${this.repo}/${this.project}@${this.branch}`;
    }

    configure(options = {}) {
        Object.assign(this, options);
    }

    useCDN(type) {
        if (CDN_BASES[type]) {
            this.cdn = type;
        }
    }

    useBranch(branch) {
        this.branch = branch;
    }

    useRepository(repo, project) {
        this.repo = repo;
        this.project = project;
    }

    hook(type, callback) {
        if (this.hooks[type]) {
            this.hooks[type].push(callback);
        }
    }

    log(...args) {
        if (this.debug) {
            console.log('[Vizitei Icons]', ...args);
        }
    }
}

export const config = new Config();