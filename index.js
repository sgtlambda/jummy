'use strict';

const _                 = require('lodash');
const fs                = require('fs');
const path              = require('path');
const pify              = require('pify');
const globby            = require('globby');
const crypto            = require('crypto');
const dirGlob           = require('dir-glob');
const Promise           = require('pinkie-promise');
const makeGlobsAbsolute = require('make-globs-absolute');

/**
 * Calculates the hash of the given file and updates the sum
 * @param {string} wd Working directory
 * @param {string} p
 * @param {Hash} hash
 * @returns {Promise}
 */
const updateHash = function (wd, p, hash) {
    return pify(fs.lstat)(p).then(stat => {
        if (!stat.isFile()) return Promise.resolve();
        else {
            var relative = path.relative(wd, p);
            hash.update(relative);
            var readStream = fs.createReadStream(p);
            readStream.on('data', d => hash.update(d));
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
    options    = _.defaults({}, options, {
        wd:        process.cwd(),
        algorithm: 'md5'
    });
    var md5sum = crypto.createHash(options.algorithm);
    return dirGlob(makeGlobsAbsolute(_.isArray(globs) ? globs : [globs], options.wd))
        .then(globs => globby(globs))
        .then(paths =>
            _.reduce(paths, (queue, path) => queue.then(() => updateHash(options.wd, path, md5sum)
            ), Promise.resolve())
        )
        .then(() => md5sum.digest('hex'));
};
