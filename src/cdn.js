import { config } from './config.js';
import { ICONS } from './constants.js';

export function getURL(name, type = 'png') {
    const base = config.baseURL;
    return `${base}/${type}/${name}.${type}`;
}

export function getSVG(name) {
    return getURL(name, 'svg');
}

export function getPNG(name) {
    return getURL(name, 'png');
}

export function icon(name, type = 'png') {
    return getURL(name, type);
}

export function exists(name) {
    return name in ICONS;
}

export function list() {
    return Object.keys(ICONS).map(key => ({
        id: key,
        name: ICONS[key].name,
        category: ICONS[key].category,
        png: getPNG(key),
        svg: getSVG(key)
    }));
}

export function random() {
    const keys = Object.keys(ICONS);
    return keys[Math.floor(Math.random() * keys.length)];
}

export function search(query) {
    const q = query.toLowerCase();
    return Object.keys(ICONS)
        .filter(key => 
            ICONS[key].name.toLowerCase().includes(q) ||
            ICONS[key].category.toLowerCase().includes(q) ||
            key.toLowerCase().includes(q)
        )
        .map(key => ({
            id: key,
            name: ICONS[key].name,
            category: ICONS[key].category
        }));
}