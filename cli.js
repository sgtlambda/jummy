#!/usr/bin/env node
'use strict';
var meow  = require('meow');
var jummy = require('./');

var cli = meow([
    'Usage',
    '  $ jummy globs..',
    '',
    'Options',
    '  --algorithm [Default: md5]',
    '',
    'Examples',
    '  $ jummy ',
    '  0b63e050cfd788c70b0d3b3fc630b535',
    '  $ jummy \'some/path/*.*\' \'!some/path/*.jpg\' --algorithm sha256',
    '  b707377cece8097eae0ecb79ce69404786d2fb3d893f8dd4ff38d1dab9ee156f'
]);

jummy(cli.input.length ? cli.input : '**/*.*', cli.flags.algorithm).then(console.log);
