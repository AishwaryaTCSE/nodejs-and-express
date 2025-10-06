
const path = require('path');

function getFileInfo(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Invalid or missing filepath');
  }

  return {
    fileName: path.basename(filePath),
    extension: path.extname(filePath),
    directory: path.dirname(filePath)
  };
}

module.exports = getFileInfo;
