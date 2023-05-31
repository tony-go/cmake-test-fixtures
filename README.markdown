# CMake test fixtures

## How to run

```sh
$ ./run.sh
```

It should output:

```text
Test project /Users/tonygorez/learn/cmake/test-fixture/build
    Start 1: start_server
1/4 Test #1: start_server .....................   Passed    0.00 sec
    Start 2: wait_for_server
2/4 Test #2: wait_for_server ..................   Passed    0.84 sec
    Start 3: my_test_case
3/4 Test #3: my_test_case .....................   Passed    0.27 sec
    Start 4: stop_server
4/4 Test #4: stop_server ......................   Passed    0.02 sec

100% tests passed, 0 tests failed out of 4

Total Test time (real) =   1.14 sec
```
