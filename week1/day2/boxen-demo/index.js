
const boxen = require('boxen');

const message = "I am using my first external module!";
const title = "Hurray!!!";

const classicBox = boxen(message, { title: title });
console.log(classicBox);

const singleDoubleBox = boxen(message, { title: title, borderStyle: 'singleDouble' });
console.log(singleDoubleBox);

const roundBox = boxen(message, { title: title, borderStyle: 'round' });
console.log(roundBox);
