# success
Testing, testing, 1, 2, 3

    npm i success


## Usage
To use it

```js
var success = require("success");
assert.equal(success(2), 4);

var successInner1 = require("success/inner/inner1");
var successInner2 = require("success/inner/inner2");

assert.equal(successInner1(), "inner1");
assert.equal(successInner2(), "inner2");
```

## License
MIT
