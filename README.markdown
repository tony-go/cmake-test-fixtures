# CMake test fixtures

## How to run

```sh
$ make
```

On the end, it should output:

```text
ctest --test-dir dist --output-on-failure
Internal ctest changing into directory: /test-fixture/dist
Test project /test-fixture/dist
    Start 1: start_server
1/3 Test #1: start_server .....................   Passed    1.06 sec
    Start 2: my_test_case
2/3 Test #2: my_test_case .....................   Passed    0.13 sec
    Start 3: stop_server
3/3 Test #3: stop_server ......................   Passed    0.02 sec

100% tests passed, 0 tests failed out of 3

Total Test time (real) =   1.21 sec
```
