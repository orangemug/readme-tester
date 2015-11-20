# bash-simple

```bash
set -e
out=`simple`
assert $out == "simple:exec"

echo "foo" > /tmp/foo-stdout.txt
## >>/tmp/foo-stdout.txt
## foo
## <<
```
