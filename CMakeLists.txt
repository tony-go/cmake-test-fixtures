cmake_minimum_required(VERSION 3.14)
project(TestProject)

# Ensure we can find the Node.js executable
find_program(NODE_EXECUTABLE NAMES node nodejs)

# Enable testing functionality in CMake
enable_testing()

# Find CURL library
find_package(CURL REQUIRED)

# Define the test executable
add_executable(test_exec test.cpp)
target_link_libraries(test_exec PRIVATE CURL::libcurl)

# Define the start server test
add_test(NAME start_server COMMAND bash -c "${NODE_EXECUTABLE} ${CMAKE_CURRENT_SOURCE_DIR}/server.js > /dev/null 2>&1 &")
set_tests_properties(start_server PROPERTIES FIXTURES_SETUP Server)

# Define the actual test, which depends on the mock server being up
add_test(NAME my_test_case COMMAND test_exec)
set_tests_properties(my_test_case PROPERTIES FIXTURES_REQUIRED Server)

# Define the stop server test
add_test(NAME stop_server COMMAND bash -c "kill -TERM $(cat ${CMAKE_BINARY_DIR}/server.pid)")
set_tests_properties(stop_server PROPERTIES FIXTURES_CLEANUP Server)
