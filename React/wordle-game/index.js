import { useEffect, useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [letters, setLetters] = useState(["", "", "", "", ""]);
  const [randomWord, setRandomWord] = useState("");
  const [showWord, setShowWord] = useState(false);
  const inputRef = useRef([]);
  const isEnabled = letters.every((l) => l !== "");

  useEffect(() => {
    setRandomWord(getRandomWord());
  }, []);

  function handleChange(value, index) {
    if (!/^[a-zA-Z]?$/.test(value)) return;

    if (showWord) {
      inputRef.current.forEach((input) => {
        input.className = "";
      });
      setShowWord(false);
    }

    updated = [...letters];
    updated[index] = value;
    setLetters(updated);

    if (value && index < 4) {
      inputRef.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }

  function handleClick() {
    const randomWordArray = randomWord.split("");

    for (let i = 0; i < randomWordArray.length; i++) {
      inputRef.current[i].classList = [];
      if (randomWordArray[i] === letters[i]) {
        inputRef.current[i].classList.add("green");
      } else if (
        randomWordArray[i] !== letters[i] &&
        randomWordArray.includes(letters[i])
      ) {
        inputRef.current[i].classList.add("yellow");
      } else {
        inputRef.current[i].classList.add("gray");
      }
    }

    setShowWord(true);
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {letters.map((letter, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            ref={(element) => {
              inputRef.current[index] = element;
            }}
            style={{
              height: "40px",
              width: "40px",
              textAlign: "center",
              fontSize: "20px",
            }}
            value={letter}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </div>
      <button
        disabled={!isEnabled}
        style={{
          marginTop: "20px",
          fontSize: "16px",
          borderRadius: "4px",
          padding: "4px 8px",
          borderWidth: "1px",
          backgroundColor: "lightblue",
        }}
        onClick={handleClick}
      >
        Submit
      </button>

      {showWord && <div style={{ fontSize: "16px" }}>{randomWord}</div>}
    </div>
  );
}

function wordBoxes() {
  const [letters, setLetters] = useState(["", "", "", "", ""]);
  const inputRef = useRef([]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      {letters.map((letter, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(element) => {
            inputRef.current[index] = element;
          }}
          style={{
            height: "40px",
            width: "40px",
            textAlign: "center",
            fontSize: "20px",
          }}
          value={letter}
          onChange={(e) => handleChange(e.target.value, index)}
        />
      ))}
    </div>
  );
}

function getRandomWord() {
  const words = [
    "apple",
    "bread",
    "cloud",
    "drift",
    "flame",
    "grape",
    "hatch",
    "infer",
    "jewel",
    "knack",
    "lemon",
    "mirth",
    "night",
    "olive",
    "plant",
    "quest",
    "river",
    "shore",
    "trace",
    "unity",
  ];

  return words[Math.floor(Math.random() * words.length)];
}
