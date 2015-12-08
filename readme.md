# jummy [![Build Status](https://travis-ci.org/jmversteeg/jummy.svg?branch=master)](https://travis-ci.org/jmversteeg/jummy)

> Get the combined hash of multiple files


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
