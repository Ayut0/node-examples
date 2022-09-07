const sum = (a, b) => a + b;

const func = (cb) => {
  const result = cb(1, 2);
  console.log("return of callback function", result);
  return result;
};

const times = (a, b) => a * b;

console.log("return of func(sum)", func(sum));
console.log("return of func(times)", func(times));
