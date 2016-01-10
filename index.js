'use strict';

const _       = require('lodash');
const fs      = require('fs');
const pify    = require('pify');
const globby  = require('globby');
const crypto  = require('crypto');
const dirGlob = require('dir-glob');
const Promise = require('pinkie-promise');

/**
 * Calculates the hash of the given file and updates the sum
 * @param {string} path
 * @param {Hash} hash
 * @returns {Promise}
 */
const updateHash = function (path, hash) {
    return pify(fs.lstat)(path).then(stat => {
        if (!stat.isFile()) return Promise.resolve();
        else {
            hash.update(path);
            var readStream = fs.createReadStream(path);
            readStream.on('data', function (d) {
                hash.update(d);
            });
            return new Promise(resolve => readStream.on('end', resolve));
        }
    });
};

/**
 * Returns the digest of all files matched by the given glob(s)
 * @param {string|string[]} globs
 * @param {object} [options]
 */
module.exports = function (globs, options) {
    options = _.defaults({}, options, {
        algorithm: 'md5'
    });
    return new Promise(resolve => {
        var md5sum = crypto.createHash(options.algorithm);
        dirGlob(_.isArray(globs) ? globs : [globs])
            .then(globs => globby(globs))
            .then(paths => {
                return _.reduce(paths, (queue, path) => queue.then(() =>
                    updateHash(path, md5sum)
                ), Promise.resolve()).then(() => resolve(md5sum.digest('hex')));
            });
    });
};
