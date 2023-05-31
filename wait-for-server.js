const fs = require('node:fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const checkFileExists = filePath => new Promise(resolve => fs.access(filePath, err => resolve(!err)));

const waitForFile = filePath => checkFileExists(filePath)
  .then(exists => exists ? Promise.resolve() : delay(500).then(() => waitForFile(filePath)));

waitForFile('server.pid').then(() => {
  // Now the server is up, we can proceed with the rest of the script.
  console.log("Server is up!");
  // Rest of your test script...
});

