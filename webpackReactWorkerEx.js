import React, { useState } from "react";
import { render } from "react-dom";
import Worker from "./fib.worker.js";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  return (
    <>
      <h1>Computing Fibonnaci Numbers (w/ webpack + React + Web Worker)</h1>
      <input type="number" onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          const newResults = results.slice();
          const resultIdx = newResults.length;
          const inputNum = Number(input);
          const result = {
            inputNum,
          };

          setResults(() => {
            newResults.push(result);
            return newResults;
          });

          if (
            Number.isNaN(inputNum) ||
            inputNum === Infinity ||
            inputNum === -Infinity
          ) {
            result.fibNum = "fail";
          } else {
            const fibWorker = new Worker();
            fibWorker.postMessage({ inputNum });
            fibWorker.onerror = (err) => console.error(err);
            fibWorker.onmessage = (e) => {
              const { fibNum, duration } = e.data;
              setResults((results) => {
                const newResults = results.slice();
                newResults[resultIdx].fibNum = fibNum;
                newResults[resultIdx].duration = duration;
                return newResults;
              });
              fibWorker.terminate();
            };
          }
        }}
      >
        Compute
      </button>
      <ol>
        {results.map(({ inputNum, fibNum, duration }, i) => {
          let txt = `${inputNum} = `;

          if (fibNum === "fail") {
            txt += "Failure";
          } else if (!fibNum) {
            txt += "In progress...";
          } else if (typeof fibNum === "number") {
            txt += `${fibNum} - ${duration}ms`;
          }

          return <li key={`${i}-${inputNum}-${fibNum}-${duration}`}>{txt}</li>;
        })}
      </ol>
    </>
  );
}

const root = document.createElement("div");
root.id = "root";
document.body.prepend(root);

render(<App />, root);
