
const factorial = require('factorial');
const numbers = [5, 7, 10, 0, -3];
numbers.forEach((num) => {
  if (num < 0) {
    console.log(`Factorial of ${num} is not defined.`);
  } else {
    console.log(`Factorial of ${num} is: ${factorial(num)}`);
  }
});
