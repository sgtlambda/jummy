'use strict';

var crypto  = require('crypto');
var _       = require('lodash');
var fs      = require('fs');
var globby  = require('globby');
var Promise = require('pinkie-promise');

/**
 * Returns the digest of all files matched by the given glob(s)
 * @param globs string|string[]
 * @param [algorithm="md5"] string
 */
module.exports = function (globs, algorithm) {
    return new Promise(function (resolve) {
        var md5sum = crypto.createHash(algorithm || "md5");
        globby(globs).then(function (paths) {
            var queue = Promise.resolve();
            _.forEach(paths, function (path) {
                queue = queue.then(function () {
                    return new Promise(function (resolve) {
                        md5sum.update(path);
                        fs.lstat(path, function (err, stat) {
                            if (stat.isFile()) {
                                var readStream = fs.createReadStream(path);
                                readStream.on('data', function (d) {
                                    md5sum.update(d);
                                });
                                readStream.on('end', function () {
                                    resolve();
                                });
                            } else {
                                resolve();
                            }
                        });
                    });
                });
            });
            queue.then(function () {
                resolve(md5sum.digest('hex'));
            });
        });
    });
};
