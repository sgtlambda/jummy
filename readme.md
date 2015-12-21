# jummy

> Get the combined hash of multiple files

[![Build Status][travis-image]][travis-url]
[![Code Quality][codeclimate-image]][codeclimate-url]
[![Code Coverage][coveralls-image]][coveralls-url]
[![NPM Version][npm-image]][npm-url]

## Install

```
$ npm install --save jummy
```


## Usage

```js
var jummy = require('jummy');

jummy(['some/path/*.*', '!some/path/*.txt']).then(console.log);
//=> 'a86b4ef32bb32dfcfbf2ef4dae613863'
```


## API

### jummy(globs, [algorithm])

#### globs

Type: `string|string[]`

#### algorithm

Type: `string`  
Default: `md5`

## CLI

```
$ npm install --global jummy
```

```
$ jummy --help

  Usage
    jummy [globs..]

  Options
    --algorithm [Default: md5]

  Examples
    $ jummy
    0b63e050cfd788c70b0d3b3fc630b535
    $ jummy 'some/path/*.*' '!some/path/*.jpg' --algorithm sha256
    b707377cece8097eae0ecb79ce69404786d2fb3d893f8dd4ff38d1dab9ee156f
```


## License

MIT © [JM Versteeg](https://github.com/jmversteeg)

[![dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

[travis-image]: https://img.shields.io/travis/jmversteeg/jummy.svg?style=flat-square
[travis-url]: https://travis-ci.org/jmversteeg/jummy

[codeclimate-image]: https://img.shields.io/codeclimate/github/jmversteeg/jummy.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jmversteeg/jummy

[david-image]: https://img.shields.io/david/jmversteeg/jummy.svg?style=flat-square
[david-url]: https://david-dm.org/jmversteeg/jummy

[david-dev-image]: https://img.shields.io/david/dev/jmversteeg/jummy.svg?style=flat-square
[david-dev-url]: https://david-dm.org/jmversteeg/jummy#info=devDependencies

[coveralls-image]: https://img.shields.io/coveralls/jmversteeg/jummy.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jmversteeg/jummy

[npm-image]: https://img.shields.io/npm/v/jummy.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/jummy
