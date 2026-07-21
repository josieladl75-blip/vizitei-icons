import { ICONS } from './constants.js';
import { config } from './config.js';
import { cache } from './cache.js';
import { getURL, getSVG, getPNG, icon, exists, list, random, search } from './cdn.js';
import { load, preload, clearCache, cacheSize } from './loader.js';
import { createImage, createSVG, createPicture, render } from './icon.js';
import './web-component.js';

const Vizitei = {
    // Configuração
    config,
    configure: (opts) => config.configure(opts),
    useCDN: (type) => config.useCDN(type),
    useBranch: (branch) => config.useBranch(branch),
    useRepository: (repo, project) => config.useRepository(repo, project),
    
    // URLs
    getURL,
    getSVG,
    getPNG,
    icon,
    
    // Consulta
    exists,
    list,
    random,
    search,
    
    // Cache
    load,
    preload,
    clearCache,
    cacheSize,
    cache,
    
    // Criação
    createImage,
    createSVG,
    createPicture,
    render,
    
    // Ícones
    icons: ICONS,
    png: Object.keys(ICONS).reduce((acc, key) => {
        acc[key] = getPNG(key);
        return acc;
    }, {}),
    svg: Object.keys(ICONS).reduce((acc, key) => {
        acc[key] = getSVG(key);
        return acc;
    }, {}),
    
    // Eventos
    on: (event, callback) => config.hook(event, callback),
    
    // Versão
    version: '1.0.0'
};

// Global
if (typeof window !== 'undefined') {
    window.Vizitei = Vizitei;
}

export default Vizitei;
export { 
    ICONS, config, cache,
    getURL, getSVG, getPNG, icon,
    exists, list, random, search,
    load, preload, clearCache, cacheSize,
    createImage, createSVG, createPicture, render
};