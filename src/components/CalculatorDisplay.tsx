import { useContext } from "react";
import { CalculatorContext } from "./Calculator";

export default function() {
  const calculatorContext = useContext(CalculatorContext);

  return (
    <div className="border-zinc-700 border-2 rounded flex flex-col items-end m-2 p-2">
      <span id="formula-display" className="text-orange-600 min-h-[1rem]">{calculatorContext?.formulaDisplay ?? "0"}</span>
      <div id="display" className="text-2xl min-h-[1rem]">{calculatorContext?.displayedNumber ?? "0"}</div>
    </div>
  );
}
