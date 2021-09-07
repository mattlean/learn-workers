/**
 * An intentionally unoptimal fibonacci number calculation.
 */
const fib = (n) => {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

onmessage = (e) => {
  const { inputNum } = e.data;
  const startTime = new Date().getTime();
  const fibNum = fib(inputNum);
  postMessage({
    fibNum,
    duration: new Date().getTime() - startTime,
  });
};
