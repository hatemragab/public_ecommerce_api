const CachemanRedis = require('cacheman-redis');

module.exports = (function () {
    const cache = new CachemanRedis();


    let _set = (key, value, callback) => cache.set(key, value, 86400, function (err, value) {
        callback = callback || function () {
        };
        if (err) throw err;
        callback(value)
    });

    let _get = (key, callback) => cache.get(key, function (err, value) {
        callback = callback || function () {
        };
        if (err) callback(null)
        callback(value)
    });
    let _del = (key, callback) => cache.del(key, function (err) {
        callback = callback || function () {
        };
        if (err) callback(null);
        else callback(true)
    });

    let _clear = (key, callback) => cache.clear(function (err) {
        callback = callback || function () {
        };
        if (err) callback(null);
        else callback(true)
    });

    return {
        set: _set,
        get: _get,
        del: _del,
        clear: _clear,
    }
})()

