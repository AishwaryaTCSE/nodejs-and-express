const os = require('os');

function getSystemInfo() {
  console.log('System Information:');
  console.log('-------------------------');
  console.log('Architecture:', os.arch());
  const cpus = os.cpus();
  console.log('CPU Cores:', cpus.length);
  console.log('CPU Model:', cpus[0].model);
  console.log('CPU Speed:', (cpus[0].speed / 1000).toFixed(2), 'GHz');
  const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);
  console.log('Total Memory:', totalMemGB, 'GB');
  console.log('Free Memory:', freeMemGB, 'GB');

  const heapUsedMB = (process.memoryUsage().heapUsed / (1024 ** 2)).toFixed(2);
  const heapTotalMB = (process.memoryUsage().heapTotal / (1024 ** 2)).toFixed(2);
  console.log('Heap Memory Used:', heapUsedMB, 'MB');
  console.log('Heap Memory Total:', heapTotalMB, 'MB');

  console.log('Hostname:', os.hostname());
  console.log('OS Type:', os.type());
}

module.exports = { getSystemInfo };
