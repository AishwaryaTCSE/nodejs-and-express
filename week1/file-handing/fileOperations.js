const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.txt');
function readFileData() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('File not found. Creating file...');
        fs.writeFile(filePath, '', (err) => {
          if (err) throw err;
          console.log('File created. It is currently empty.');
        });
      } else {
        console.error('Error reading file:', err);
      }
    } else {
      console.log('File Content:\n', data);
    }
  });
}
function appendFileData() {
  const appendText = 'This is Appended data\n';
  fs.appendFile(filePath, appendText, (err) => {
    if (err) {
      console.error('Error appending data:', err);
    } else {
      console.log('Appending data...');
    }
  });
}

module.exports = { readFileData, appendFileData };
    