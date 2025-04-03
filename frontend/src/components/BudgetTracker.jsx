import { useExpenses } from "../context/ExpenseContext";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState } from "react";

function BudgetTracker() {
  const { budget, totalExpenses, dispatch } = useExpenses();
  const [alert, setAlert] = useState(null);

  const handleBudgetChange = (e) => {
    const newBudget = parseFloat(e.target.value);
    if (!isNaN(newBudget) && newBudget >= 0) {
      dispatch({ type: "SET_BUDGET", payload: newBudget });
    }
  };

  const remaining = budget - totalExpenses;
  const progress = (totalExpenses / budget) * 100;

  useEffect(() => {
    if (budget > 0) {
      if (totalExpenses > budget) {
        setAlert("🚨 Budget exceeded! Time to cut back.");
      } else if (totalExpenses >= budget * 0.9) {
        setAlert("⚠️ You're close to hitting your budget!");
      } else {
        setAlert(null);
      }
    }
  }, [totalExpenses, budget]);

  const handleManualReset = () => {
    const currentMonth = new Date().getMonth();
    dispatch({ type: "RESET_MONTH", payload: currentMonth });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-900 to-purple-400 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">Budget Tracker 🎯</h2>

      <div className="relative mb-4">
        <FaRupeeSign className="absolute left-3 top-3 text-gray-500" />
        <input
          type="number"
          className="w-full pl-10 p-3 text-gray-800 placeholder-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Set your budget..."
          value={budget || ""}
          onChange={handleBudgetChange}
        />
      </div>

      <div className="mt-4 h-6 bg-gray-300 rounded-full shadow-inner overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            remaining < 0
              ? "bg-red-500"
              : progress > 75
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      <p
        className={`mt-2 font-semibold ${
          remaining < 0 ? "text-red-600" : "text-white"
        }`}
      >
        {remaining < 0
          ? `Over budget by ₹${Math.abs(remaining)}`
          : `Remaining: ₹${remaining}`}
      </p>

      <p className="mt-1 text-sm text-white opacity-80">
        Total Spent: ₹{totalExpenses} / ₹{budget}
      </p>

      {alert && (
        <div className="mt-4 p-2 bg-yellow-500 text-white font-semibold text-sm rounded-md shadow-md animate-pulse">
          {alert}
        </div>
      )}

<button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        onClick={handleManualReset}
      >
        🔄 Reset Monthly Expenses
      </button>
    </div>
  );
}

export default BudgetTracker;
