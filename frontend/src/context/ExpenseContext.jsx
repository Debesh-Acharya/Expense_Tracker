import { createContext, useContext, useReducer,useEffect } from "react";

const ExpenseContext = createContext();

const initialState = {
  budget: 0,
  expenses: [],
  savingsGoal: 0,
  monthReset: false,
};

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case "EDIT_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
        ),
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
      };

    case "SET_BUDGET":
      return { ...state, budget: action.payload };

    case "SET_GOAL":
      return { ...state, savingsGoal: action.payload };

    case "RESET_MONTH":
      return { ...state, expenses: [],lastResetMonth: action.payload};

    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const totalExpenses = state.expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const remainingBudget = state.budget - totalExpenses;
  const savingsProgress = Math.max(
    0,
    ((state.budget - totalExpenses) / state.savingsGoal) * 100
  );

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    if (state.lastResetMonth !== currentMonth) {
      dispatch({ type: "RESET_MONTH", payload: currentMonth });
    }
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        totalExpenses,
        remainingBudget,
        savingsProgress,
        dispatch,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);
