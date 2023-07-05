const fs = require('fs/promises');
const net = require('net');
const path = require('path');
const cp = require('child_process');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const checkServerIsUp = (port) => new Promise(resolve => {
    console.log(`Checking if server is up on port ${port}...`);
    const client = net.createConnection({ port }, () => {
        client.end();
        console.log('Net client connected');
        resolve(true);
    });

    client.on('error', () => resolve(false));
});

const waitForServer = async (port) => {
    while (true) {
        const serverIsUp = await checkServerIsUp(port);
        if (serverIsUp) break;

        await delay(1000);
    }
};

let portFileTries = 0;
const waitForPortFile = async () => {
    try {
        console.log('Reading server.port file...');
        const data = await fs.readFile(path.join('server.port'), 'utf8'); 
        const port = Number(data);
        await waitForServer(port);
    } catch (err) {
        console.log('server.port file not found, retrying...');
        await delay(1000);
        return waitForPortFile();
    } finally {
        portFileTries++;
        if (portFileTries > 5) {
            console.log('server.port file not found after 10 tries, exiting...');
            process.exit(1);
        }
    }
};

(async () => {
    const lsla = cp.execSync('ls -la');
    console.log(lsla.toString());
    cp.spawn('node', ['server.js'], { detached: true, stdio: 'ignore' }).unref();
    console.log('Waiting for server to start...');
    await waitForPortFile();
    console.log('Server is up!');
})();

