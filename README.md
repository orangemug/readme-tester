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


To test your `README.md` just the following and all the code in _js_ code tags will be executed, including assertions which will fail the tests.

```js
var readmeTester = require("readme-tester");

readmeTester(__dirname+"/test/examples/fail", function(err, assertions) {
  assert(err);
});
```

Actually this markdown document [/test/index.js](/test/index.js) is also tested by itself, which in turn runs `readme-tester` in the markdown above... very meta!


## License
[MIT](LICENSE)
