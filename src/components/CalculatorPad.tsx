import { useContext } from "react";
import { CalculatorContext } from "./Calculator";

export type PadType = "operator" | "number" | "clear" | "decimal";

export type NumberPadProps = {
  displayed: string,
  padId: string,
  typePad: PadType,
  doubleColSpan?: boolean,
  doubleRowSpan?: boolean,
  className?: string, // for extended coloring
};

export default function(props: NumberPadProps) {
  const calculatorContext = useContext(CalculatorContext);

  // This is only string of the button not displayed one
  // or it will not be handled to parent
  function sendEvent(displayed: string, padType: PadType) {
    if (calculatorContext == null) {
      console.error("It's so wrong to handle this");
      return;
    }

    calculatorContext.eventHandlerPad(displayed, padType);
  }

  return (
    <button onClick={() => sendEvent(props.displayed, props.typePad)}
      id={props.padId} className={`flex justify-center items-center p-4 border-2
        border-zinc-200 rounded text-xl font-bold hover:bg-zinc-500 hover:text-white ${props.doubleColSpan ? "col-span-2" : ""}
        ${props.doubleRowSpan ? "row-span-2" : ""} ${props.className ?? "bg-zinc-700"}`}>
      {props.displayed}
    </button>
  );
}
