'use strict';

const chai = require('chai');
chai.should();

const jummy   = require('./');
const mock    = require('mock-fs');
const Promise = require('pinkie-promise');

describe('jummy', () => {

    before(() => {
        mock({
            'path/to/fake/dir': {
                'some-file.txt': 'file content here',
                'empty-dir':     {/** empty directory */}
            },
            'path/to/some.png': new Buffer([8, 6, 7, 5, 3, 0, 9]),
            'some/other/path':  {/** another empty directory */}
        });
    });

    after(() => {
        mock.restore();
    });

    it('should generate hashes for the provided globs', () => {
        return Promise.all([
            jummy('path/to/fake/dir/*.*'),
            jummy('path/*.*')
        ]).then(hashes => {
            return hashes[0].should.not.be.equal(hashes[1]);
        });
    });

    it('should accept directory names', () => {
        return Promise.all([
            jummy('path/to/fake/dir/*.*'),
            jummy('path/to/fake/dir')
        ]).then(hashes => {
            return hashes[0].should.be.equal(hashes[1]);
        });
    });
});
