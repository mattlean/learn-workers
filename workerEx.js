const input = document.querySelector("input");
const btn = document.querySelector("button");
const log = document.querySelector("ol");

btn.addEventListener("click", () => {
  const result = document.createElement("li");
  log.appendChild(result);
  result.textContent = `${input.value} = In progress...`;
  const inputNum = Number(input.value);

  if (
    Number.isNaN(inputNum) ||
    inputNum === Infinity ||
    inputNum === -Infinity
  ) {
    result.textContent = `${input.value} = Failure`;
  } else {
    const fibWorker = new window.Worker("/fib.worker.js");
    fibWorker.postMessage({ inputNum });
    fibWorker.onerror = (err) => console.error(err);
    fibWorker.onmessage = (e) => {
      const { fibNum, duration } = e.data;
      result.textContent = `${inputNum} = ${fibNum} - ${duration}ms`;
      fibWorker.terminate();
    };
  }
});
