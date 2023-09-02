import { createContext, useEffect, useState } from "react";

import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorPad, { NumberPadProps, PadType } from "./CalculatorPad";
import { calculateDispatch } from "../utility/Calculate";

export type CalculatorContextType = {
  formulaDisplay: string,
  displayedNumber: string,
  eventHandlerPad: (padNumber: string, padType: PadType) => void,
};

export const CalculatorContext = createContext<CalculatorContextType | null>(null);

const calculatorButton: Array<NumberPadProps> = [
  { padId: "clear", displayed: "AC", typePad: "clear", doubleColSpan: true, className: "bg-red-800 text-white" },
  { padId: "divide", displayed: "÷", typePad: "operator", className: "operator" },
  { padId: "multiply", displayed: "X", typePad: "operator", className: "operator" },

  { padId: "seven", displayed: "7", typePad: "number" },
  { padId: "eight", displayed: "8", typePad: "number" },
  { padId: "nine", displayed: "9", typePad: "number" },
  { padId: "subtract", displayed: "-", typePad: "operator", className: "operator" },

  { padId: "four", displayed: "4", typePad: "number" },
  { padId: "five", displayed: "5", typePad: "number" },
  { padId: "six", displayed: "6", typePad: "number" },
  { padId: "add", displayed: "+", typePad: "operator", className: "operator" },

  { padId: "one", displayed: "1", typePad: "number" },
  { padId: "two", displayed: "2", typePad: "number" },
  { padId: "three", displayed: "3", typePad: "number" },
  { padId: "equals", displayed: "=", typePad: "operator", doubleRowSpan: true, className: "bg-blue-800 text-white" },

  { padId: "zero", displayed: "0", typePad: "number", doubleColSpan: true },
  { padId: "decimal", displayed: ".", typePad: "decimal" },
];

export default function() {
  const [displayedNumber, setDisplayedNumber] = useState("0");
  const [displayedFormula, setFormulaDisplay] = useState("");

  // useEffect(() => {
  //   alert("Please note that this calculator use `Immediate Execution Logic` cuz i'm lazy to implement `Formula Execution Logic`, even test case allowed it so why not");
  // }, []);

  function eventHandlerPad(displayed: string, padType: PadType) {
    calculateDispatch({
      padDisplay: displayed,
      padType: padType,
      currentDisplayed: displayedNumber,
      currentFormula: displayedFormula,
      updateDisplay: (newDisplay: string) => setDisplayedNumber(newDisplay),
      updateDisplayFormula: (newDisplay: string) => setFormulaDisplay(newDisplay),
    })
  }

  const contextValue = {
    formulaDisplay: displayedFormula,
    displayedNumber: displayedNumber,
    eventHandlerPad: eventHandlerPad,
  };

  return (
    <div className="border-gray-300 border-2 shadow rounded-md p-4 text-white">
      <CalculatorContext.Provider value={contextValue}>
        <CalculatorDisplay />

        <div className="grid grid-cols-4 grid-rows-5 gap-2 border-zinc-800 border-2 p-2">
          {calculatorButton.map((val, idx) =>
            <CalculatorPad key={idx} displayed={val.displayed} padId={val.padId} typePad={val.typePad}
              doubleColSpan={val.doubleColSpan} doubleRowSpan={val.doubleRowSpan} className={val.className} />
          )}
        </div>
      </CalculatorContext.Provider>
    </div>
  );
}
