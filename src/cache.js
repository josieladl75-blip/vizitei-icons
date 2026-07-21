class CacheManager {
    constructor() {
        this.memoryCache = new Map();
        this.weakCache = new WeakMap();
        this.hits = 0;
        this.misses = 0;
    }

    set(key, value) {
        this.memoryCache.set(key, {
            data: value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const entry = this.memoryCache.get(key);
        if (entry) {
            this.hits++;
            return entry.data;
        }
        this.misses++;
        return null;
    }

    has(key) {
        return this.memoryCache.has(key);
    }

    delete(key) {
        return this.memoryCache.delete(key);
    }

    clear() {
        this.memoryCache.clear();
        this.weakCache = new WeakMap();
        this.hits = 0;
        this.misses = 0;
    }

    size() {
        return this.memoryCache.size;
    }

    stats() {
        return {
            size: this.size(),
            hits: this.hits,
            misses: this.misses,
            hitRatio: this.hits / (this.hits + this.misses) || 0
        };
    }
}

export const cache = new CacheManager();