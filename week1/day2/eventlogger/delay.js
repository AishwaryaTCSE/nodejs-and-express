
function delayMessage(message, time) {
  return new Promise((resolve, reject) => {
    if (!message || !time || isNaN(time)) {
      return reject(new Error('Invalid message or time'));
    }
    setTimeout(() => {
      resolve({ message, delay: `${time}ms` });
    }, Number(time));
  });
}

module.exports = delayMessage;
