// TestExecutable.cpp
#include <chrono>
#include <fstream>
#include <iostream>
#include <thread>

#include <curl/curl.h>

int main() {
  CURL *curl;
  CURLcode res;

  curl_global_init(CURL_GLOBAL_DEFAULT);

  curl = curl_easy_init();
  if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:8080");

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
