// TestExecutable.cpp
#include <chrono>
#include <fstream>
#include <iostream>
#include <thread>
#include <cstdlib>

#include <curl/curl.h>

int test(const std::string &server_port_str) {
  CURL *curl;
  CURLcode res;

  curl_global_init(CURL_GLOBAL_DEFAULT);

  curl = curl_easy_init();
  const std::string url = "http://localhost:" + server_port_str;
  if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());

    res = curl_easy_perform(curl);

    if (res != CURLE_OK) {
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));
      return 1;
    }

    curl_easy_cleanup(curl);
  }

  curl_global_cleanup();

  return 0;
}

int main() {
  const char* portFilePath = std::getenv("PORT_FILE");
  if (!portFilePath) {
    std::cerr << "PORT_FILE environment variable not set\n";
    return 1;
  }

  std::ifstream portFile(portFilePath);
  if (!portFile.is_open()) {
    std::cerr << "Failed to open " << portFilePath << "\n";
    return 1;
  }

  std::string serverPort;
  std::getline(portFile, serverPort);
  return test(std::string(serverPort));
}

