'use strict';

const _       = require('lodash');
const fs      = require('fs');
const pify    = require('pify');
const globby  = require('globby');
const crypto  = require('crypto');
const Promise = require('pinkie-promise');

/**
 * Calculates the hash of the given file and updates the sum
 * @param {string} file
 * @param {Hash} hash
 * @returns {Promise}
 */
const updateHash = function (file, hash) {
    hash.update(file);
    return pify(fs.lstat)(file).then(stat => {
        if (!stat.isFile()) return Promise.resolve();
        else {
            var readStream = fs.createReadStream(file);
            readStream.on('data', function (d) {
                hash.update(d);
            });
            return new Promise(resolve => readStream.on('end', resolve));
        }
    });
};

/**
 * Returns the digest of all files matched by the given glob(s)
 * @param globs string|string[]
 * @param [algorithm="md5"] string
 */
module.exports = function (globs, algorithm) {
    return new Promise(resolve => {
        var md5sum = crypto.createHash(algorithm || "md5");
        globby(globs).then(paths => {
            return _.reduce(paths, (queue, path) => queue.then(() =>
                updateHash(path, md5sum)
            ), Promise.resolve()).then(() => resolve(md5sum.digest('hex')));
        });
    });
};
