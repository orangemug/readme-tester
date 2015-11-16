# readme-tester
A library to test READMEs (or any markdown files actually)

[![circleci](https://circleci.com/gh/orangemug/nonodeify.png?style=shield)](https://circleci.com/gh/orangemug/nonodeify)
[![Dependency Status](https://david-dm.org/orangemug/nonodeify.svg)](https://david-dm.org/orangemug/nonodeify)
[![Dev Dependency Status](https://david-dm.org/orangemug/nonodeify/dev-status.svg)](https://david-dm.org/orangemug/nonodeify#info=devDependencies)


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

    ## License
    MIT

To test your `README.md` just run

```js
var readmeTester = require("readme-tester");

readmeTester(__dirname+"/test/examples/fail", function(err, assertions) {
  assert(err);
});
```


## License
[MIT](LICENSE)
