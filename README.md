# readme-tester
A library to test READMEs (or any markdown files actually)

![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)
[![circleci](https://circleci.com/gh/orangemug/readme-tester.png?style=shield)](https://circleci.com/gh/orangemug/readme-tester)
[![Dependency Status](https://david-dm.org/orangemug/readme-tester.svg)](https://david-dm.org/orangemug/readme-tester)
[![Dev Dependency Status](https://david-dm.org/orangemug/readme-tester/dev-status.svg)](https://david-dm.org/orangemug/readme-tester#info=devDependencies)


## Install
To install

    npm i git://github.com/orangemug/readme-tester.git



## Usage
So say you have a README markdown file like so

    # fail
    Testing, testing, 1, 2, 3

        npm i fail


    ## Usage
    To use it

    ```js
    var fail = require("fail");
    var out = fail(2)
    assert(out, 5);
    ```


All the code in _js_ code tags will concatinated and executed. The following will be added to the top by default

    var assert = require("assert");

Any errors thrown in the markdown code will cause an error. To test your `README.md` just run the following

```js
var readmeTester = require("readme-tester");

readmeTester(__dirname+"/test/examples/fail", function(err, assertions) {
  assert(err);
});
```

Actually this markdown document [/test/index.js](/test/index.js) is also tested by itself, which in turn runs `readme-tester` in the markdown above... very meta!


### CLI
There is also a CLI

```bash
readme-tester --help 2> /tmp/stderr.txt
## >>/tmp/stderr.txt
## Test a README.
## 
## Usage: bin/cli.js <path>
## 
## Options:
##   -h, --help  Show help                                                [boolean]
## <<
```

Example usage

```bash
readme-tester ./test/examples/success
## :exit => 1

readme-tester ./test/examples/fail
## :exit => 0
```


## License
[MIT](LICENSE)
