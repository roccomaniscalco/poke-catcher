const repeat = (func, iterations) => {
  return function executedFunction(...args) {
    for (let index = 0; index <= iterations; index++) {
      func(...args);
    }
  };
};

export default repeat;
