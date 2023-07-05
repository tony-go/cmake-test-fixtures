all: clean configure build test

configure:
	cmake -B dist

build: configure
	make -C dist

test: build
	ctest --test-dir dist --output-on-failure -j 4

clean:
	rm -f server.port server.pid
	rm -rf dist
