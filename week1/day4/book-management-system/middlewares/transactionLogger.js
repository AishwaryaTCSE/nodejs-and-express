function logTransaction(action, readerName, bookTitle) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${readerName} ${action} "${bookTitle}"`);
}

module.exports = logTransaction;
