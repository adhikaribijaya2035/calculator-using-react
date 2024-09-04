import "./App.css";
import DigitButtons from "./DigitButtons";
import OperationButtons from "./OperationButton";
import { useReducer } from "react";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes(".")) return state;
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state;
      }

      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return "";
  }

  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation,}, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-2" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>

      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>Del</button>

      <OperationButtons operation="/" dispatch={dispatch} />

      <DigitButtons digit="1" dispatch={dispatch} />
      <DigitButtons digit="2" dispatch={dispatch} />
      <DigitButtons digit="3" dispatch={dispatch} />
      <OperationButtons operation="*" dispatch={dispatch} />
      <DigitButtons digit="4" dispatch={dispatch} />
      <DigitButtons digit="5" dispatch={dispatch} />
      <DigitButtons digit="6" dispatch={dispatch} />
      <OperationButtons operation="+" dispatch={dispatch} />
      <DigitButtons digit="7" dispatch={dispatch} />
      <DigitButtons digit="8" dispatch={dispatch} />
      <DigitButtons digit="9" dispatch={dispatch} />
      <OperationButtons operation="-" dispatch={dispatch} />
      <DigitButtons digit="." dispatch={dispatch} />
      <DigitButtons digit="0" dispatch={dispatch} />
      <button className="span-2" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>

    </div>
  );
}

export default App;
