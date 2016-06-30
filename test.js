'use strict';

const chai = require('chai');
chai.should();

const path    = require('path');
const jummy   = require('./');
const Promise = require('pinkie-promise');

describe('jummy', () => {

    before(() => {
        process.chdir(path.join(__dirname, 'dummy'));
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
    
    it('should return the same for two empty directories', () => {
        return Promise.all([
            jummy('path/to/fake/dir/empty-dir'),
            jummy('path/to/fake/dir/some/other/path')
        ]).then(hashes => {
            return hashes[0].should.be.equal(hashes[1]);
        });
    })
});
