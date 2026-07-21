import { cache } from './cache.js';
import { config } from './config.js';

export function preload(names, type = 'png') {
    const urls = Array.isArray(names) 
        ? names.map(n => getURL(n, type)) 
        : [getURL(names, type)];
    
    return Promise.all(urls.map(url => loadImage(url)));
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        if (cache.has(url)) {
            config.log('Cache hit:', url);
            resolve(cache.get(url));
            return;
        }

        config.log('Cache miss:', url);
        const img = new Image();
        img.onload = () => {
            cache.set(url, img);
            resolve(img);
        };
        img.onerror = () => reject(new Error(`Failed to load: ${url}`));
        img.src = url;
    });
}

export function load(name, type = 'png') {
    const url = getURL(name, type);
    return loadImage(url);
}

export function clearCache() {
    cache.clear();
    config.log('Cache cleared');
}

export function cacheSize() {
    return cache.size();
}