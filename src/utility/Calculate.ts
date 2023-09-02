import Mexp from "math-expression-evaluator";
import { PadType } from "../components/CalculatorPad";

type UpdateDisplay = (newDisplay: string) => void;

export type calculateDispatchParam = {
    currentDisplayed: string,
    currentFormula: string,
    padDisplay: string,
    padType: PadType,
    updateDisplay: UpdateDisplay;
    updateDisplayFormula: UpdateDisplay;
}

function shouldDecimal(displayed: string): boolean {
    return !displayed.includes(".");
}

// I'm too tired for making Shunting yard algorithm to evaluate math expression
// so i use library i know it's feel like cheating but, I'm on timer rn tbh i already
// made math evaluator using shunting yard algorithm;)
function doMath(formula: string) {
    const mathExpr = new Mexp()
    const convertedFormula = formula.replace("÷", "/").replace("X", "*");
    // @ts-ignore
    return mathExpr.eval(convertedFormula);
}

export function calculateDispatch({ currentDisplayed, currentFormula, padDisplay, padType, updateDisplay, updateDisplayFormula }:
    calculateDispatchParam) {
    switch (padType) {
        case "decimal":
            if (shouldDecimal(currentDisplayed)) {
                updateDisplay(currentDisplayed + ".");
            }
            break;
        case "clear":
            updateDisplayFormula("");
            updateDisplay("0");
            break;
        case "number":
            if (currentDisplayed.length == 1 && currentDisplayed[0] == "0") {
                return updateDisplay(padDisplay);
            } else if (currentDisplayed.length == 2 && currentDisplayed[1] == "0" && currentDisplayed[0] == "-") {
                return updateDisplay(`-${padDisplay}`);
            }
            updateDisplay(currentDisplayed + padDisplay);
            break;
        case "operator":
            if (currentDisplayed.length == 1 && currentDisplayed[0] == "0") {
                updateDisplay(`-${currentDisplayed}`);
                break;
            }
            if (currentFormula.includes('=')) {
                updateDisplayFormula(currentDisplayed + padDisplay);
                updateDisplay("");
                break;
            }

            let tempDisplay = "";
            let tempFormula = currentFormula + currentDisplayed;
            if (padDisplay == "=") {
                const result = doMath(tempFormula);
                tempFormula += padDisplay + result;
                tempDisplay = result.toString();
            } else {
                tempFormula += padDisplay;
            }
            updateDisplayFormula(tempFormula);
            updateDisplay(tempDisplay);
            break;
    }
}
