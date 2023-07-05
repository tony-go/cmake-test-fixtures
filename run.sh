# Delete the old build directory if it exists
if [ -d "build" ]; then
  echo "Removing old build directory"
  rm -rf build
fi

# Create a new directory for the build
mkdir build && cd build

# Generate Makefile with CMake
cmake ..

# Compile and build your project
make

# Run the tests
ctest --output-on-failure

# Go back to the root directory
cd ../
