/**
 * An intentionally unoptimal fibonacci number calculation.
 */
const fib = (n) => {
  if (n < 2) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
};

const input = document.querySelector("input");
const btn = document.querySelector("button");
const log = document.querySelector("ol");

btn.addEventListener("click", (e) => {
  if (input.value) {
    const inputNum = Number(input.value);

    if (
      !Number.isNaN(inputNum) &&
      inputNum !== Infinity &&
      inputNum !== -Infinity
    ) {
      const computation = document.createElement("li");

      const startTime = new Date().getTime();
      const fibNum = fib(inputNum);
      const duration = new Date().getTime() - startTime;

      computation.textContent = `${inputNum} = ${fibNum} - ${duration}ms`;
      log.appendChild(computation);
    }
  }
});
