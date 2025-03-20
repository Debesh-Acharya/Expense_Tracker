import { useExpenses } from "../context/ExpenseContext";
import { useState } from "react";

function SavingsTracker() {
  const { totalExpenses, budget } = useExpenses();
  const [savingsGoal, setSavingsGoal] = useState(0);

  const handleSetGoal = (e) => {
    const goal = parseFloat(e.target.value);
    if (!isNaN(goal) && goal >= 0) setSavingsGoal(goal);
  };

  const remainingBudget = budget - totalExpenses;

  const isSavingsInDanger = remainingBudget < savingsGoal;
  const isSavingsSafe = remainingBudget >= savingsGoal;

  return (
    <div className="p-4 bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-800 rounded-xl shadow-lg transition-all duration-300">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        Savings Goal 🏦
      </h2>

      <input
        type="number"
        placeholder="Set Savings Goal"
        value={savingsGoal || ""}
        onChange={handleSetGoal}
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
      />

      <p className="text-gray-700 dark:text-gray-200 font-medium">
        Remaining Budget: ₹{remainingBudget} / Savings Goal: ₹{savingsGoal}
      </p>

      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded h-4 overflow-hidden mt-2">
        <div
          className={`h-full ${
            isSavingsInDanger
              ? "bg-red-500"
              : isSavingsSafe
              ? "bg-green-500"
              : "bg-blue-500 dark:bg-blue-400"
          }`}
          style={{ width: `${(remainingBudget / budget) * 100}%` }}
        ></div>
      </div>

      {isSavingsInDanger && (
        <p className="mt-2 text-red-500 font-semibold">
          ⚠️ Warning: Your remaining budget is below your savings goal!
        </p>
      )}

      {isSavingsSafe && remainingBudget >= savingsGoal && (
        <p className="mt-2 text-green-500 font-semibold">
          ✅ Congrats! You've kept your savings intact!
        </p>
      )}
    </div>
  );
}

export default SavingsTracker;
