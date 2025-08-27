import React, { useState } from "react";
import Button from "./Button";

const buttons = [
  ["C", "√", "x²", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["±", "0", ".", "="],
];

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const toggleSign = () => {
    setDisplay((prev) =>
      prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev
    );
  };

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("0");
      setOperator(null);
      setFirstValue(null);
      setWaitingForOperand(false);
      return;
    }

    if (value === "√") {
      setDisplay(Math.sqrt(parseFloat(display)).toString());
      return;
    }

    if (value === "x²") {
      setDisplay((Math.pow(parseFloat(display), 2)).toString());
      return;
    }

    if (value === "±") {
      toggleSign();
      return;
    }

    if (["/", "*", "-", "+"].includes(value)) {
      if (operator && waitingForOperand) {
        setOperator(value);
        setDisplay(firstValue + " " + value);
      } else {
        setOperator(value);
        setFirstValue(parseFloat(display));
        setDisplay(display + " " + value);
        setWaitingForOperand(true);
      }
      return;
    }

    if (value === "=") {
      if (operator && firstValue !== null) {
        const secondValue = parseFloat(display.split(" ").pop());
        let result = 0;
        switch (operator) {
          case "+": result = firstValue + secondValue; break;
          case "-": result = firstValue - secondValue; break;
          case "*": result = firstValue * secondValue; break;
          case "/": result = secondValue !== 0 ? firstValue / secondValue : "Error"; break;
          default: break;
        }
        setDisplay(result.toString());
        setOperator(null);
        setFirstValue(null);
        setWaitingForOperand(false);
      }
      return;
    }

    if (waitingForOperand) {
      setDisplay(value === "." ? "0." : value);
      setWaitingForOperand(false);
    } else {
      if (value === ".") {
        if (!display.includes(".")) setDisplay(display + ".");
      } else {
        setDisplay(display === "0" ? value : display + value);
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
      <div className="bg-black text-white text-4xl rounded-lg mb-6 p-5 min-h-[70px] flex items-center justify-end">
        <span className="truncate">{display}</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((btn, idx) => (
          <Button
            key={idx}
            value={btn}
            onClick={handleClick}
            className={
              btn === "="
                ? "bg-orange-500 hover:bg-orange-400 col-span-2"
                : btn === "0"
                ? "col-span-2"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
