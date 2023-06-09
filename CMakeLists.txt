cmake_minimum_required(VERSION 3.14)
project(TestProject)

# Ensure we can find the Node.js executable
find_program(NODE_EXECUTABLE NAMES node nodejs)

# Enable testing functionality in CMake
enable_testing()

# Find CURL library
find_package(CURL REQUIRED)

# Define the tests executables
add_executable(test_exec test.cpp)
target_link_libraries(test_exec PRIVATE CURL::libcurl)
add_executable(test_exec_2 test2.cpp)
target_link_libraries(test_exec_2 PRIVATE CURL::libcurl)

configure_file(${CMAKE_CURRENT_SOURCE_DIR}/server.js ${CMAKE_BINARY_DIR}/server.js COPYONLY)

# Add a new test that waits for the server to be ready
add_test(NAME start_server COMMAND ${NODE_EXECUTABLE} ${CMAKE_CURRENT_SOURCE_DIR}/start_server.js)
set_tests_properties(start_server PROPERTIES FIXTURES_SETUP Server)

# Define the actual test, which depends on the mock server being up
add_test(NAME my_test_case COMMAND test_exec)
set_tests_properties(my_test_case PROPERTIES FIXTURES_REQUIRED Server)
set_property(TEST my_test_case
             PROPERTY ENVIRONMENT "PORT_FILE=${CMAKE_BINARY_DIR}/server.port")
add_test(NAME my_test_case_2 COMMAND test_exec_2)
set_tests_properties(my_test_case_2 PROPERTIES FIXTURES_REQUIRED Server)
set_property(TEST my_test_case_2
             PROPERTY ENVIRONMENT "PORT_FILE=${CMAKE_BINARY_DIR}/server.port")

# Define the stop server test
add_test(NAME stop_server COMMAND bash -c "kill -TERM $(cat ${CMAKE_BINARY_DIR}/server.pid) \n rm ${CMAKE_BINARY_DIR}/server.pid \n rm ${CMAKE_BINARY_DIR}/server.port")
set_tests_properties(stop_server PROPERTIES FIXTURES_CLEANUP Server)
