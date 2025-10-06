const express = require('express');
const os = require('os');
const dns = require('dns');
const { readFileContent } = require('./read');

const app = express();
const PORT = 3000;

// Route 1: Test
app.get('/test', (req, res) => {
    res.send("Test route is working!");
});

// Route 2: Read file
app.get('/readfile', (req, res) => {
    const content = readFileContent();
    res.send(content);
});

// Route 3: System details
app.get('/systemdetails', (req, res) => {
    const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB';
    const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB';
    const cpuModel = os.cpus()[0].model;

    res.json({
        platform: os.platform(),
        totalMemory: totalMemGB,
        freeMemory: freeMemGB,
        cpuModel: cpuModel,
        cpuCores: os.cpus().length
    });
});

// Route 4: Get IP address
app.get('/getip', (req, res) => {
    dns.lookup('masaischool.com', (err, address, family) => {
        if (err) {
            res.json({ error: err.message });
        } else {
            res.json({
                hostname: 'masaischool.com',
                ipAddress: address,
                family: family
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
