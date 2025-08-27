import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, toggleNumberAllowed] = useState(false);
  const [charAllowed, toggleCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-pink-600">
      <h1 className="text-white text-center my-3 text-2xl">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          className=" outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordToClipboard}
        >
          copy
        </button>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          min={6}
          max={48}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
          name=""
          id="length"
        />
        <label htmlFor="length">Length: {length}</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            toggleNumberAllowed((prev) => !prev);
          }}
          name=""
          id="number"
        />
        <label htmlFor="number">Numbers {numberAllowed}</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {
            toggleCharAllowed((prev) => !prev);
          }}
          name=""
          id="character"
        />
        <label htmlFor="character">Characters {charAllowed}</label>
      </div>
    </div>
  );
}

export default App;
