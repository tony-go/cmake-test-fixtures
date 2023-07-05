# CMake test fixtures

## How to run

```sh
$ make
```

On the end, it should output:

```text
ctest --test-dir dist --output-on-failure -j 4
Internal ctest changing into directory: /Users/tonygorez/learn/cmake/test-fixture/dist
Test project /Users/tonygorez/learn/cmake/test-fixture/dist
    Start 1: start_server
1/4 Test #1: start_server .....................   Passed    1.07 sec
    Start 2: my_test_case
    Start 3: my_test_case_2
2/4 Test #2: my_test_case .....................   Passed    0.10 sec
3/4 Test #3: my_test_case_2 ...................   Passed    0.12 sec
    Start 4: stop_server
4/4 Test #4: stop_server ......................   Passed    0.01 sec

100% tests passed, 0 tests failed out of 4

Total Test time (real) =   1.21 sec
```
