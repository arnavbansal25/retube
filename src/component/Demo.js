import React, { useState } from "react";

// A Heavy Operation
const findNthPrime = (num) => {
  let i,
    primes = [2, 3],
    n = 5;
  const isPrime = (n) => {
    let i = 1,
      p = primes[i],
      limit = Math.ceil(Math.sqrt(n));
    while (p <= limit) {
      if (n % p === 0) {
        return false;
      }
      i += 1;
      p = primes[i];
    }
    return true;
  };
  for (i = 2; i <= num; i += 1) {
    while (!isPrime(n)) {
      n += 2;
    }
    primes.push(n);
    n += 2;
  }
  return primes[num - 1];
};

const Demo = () => {
  const [inputText, setInputText] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  console.log("Rendering...");
  // note that this will be logged every time a render happens...that measn every time the state is updated

  // now suppose there is a heavy operation here
  // HEAVY OPERATION
  // now, we don't need to perform this Heavy Operation on every re-render...it is just illogical and very expensive
  // So, we can memoize this Heavy Operation to increase application performance

  const prime = findNthPrime(inputText);
  // we can see that the page freezez after entering >7 digits...so this is a heavy operation

  return (
    <div
      className={
        "m-4 p-2 w-96 h-96 border border-black " +
        (isDarkTheme && "bg-gray-400")
      }
    >
      <div>
        <button
          className="m-10 p-2 bg-green-200"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >
          Toggle
        </button>
      </div>
      <div>
        <input
          className="border border-black w-72 px-2"
          type="number"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <h1 className="mt-4 font-bold text-xl">nth Prime : {prime}</h1>
      </div>

      <div className="bg-pink-500 p-4" onClick={() => console.log("aaa")}>
        <input className="border border-black" onChange={(e) => console.log(e.target.value)} />
      </div>
    </div>
  );
};

export default Demo;
