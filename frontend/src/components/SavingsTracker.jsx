import { useExpenses } from "../context/ExpenseContext";
import { useState } from "react";

function SavingsTracker() {
  const { totalExpenses, dispatch } = useExpenses();
  const [savingsGoal, setSavingsGoal] = useState(0);

  const handleSetGoal = (e) => setSavingsGoal(parseInt(e.target.value, 10));

  const savingsProgress = savingsGoal
    ? Math.max(0, ((savingsGoal - totalExpenses) / savingsGoal) * 100)
    : 0;

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
        Remaining: ₹{Math.max(0, savingsGoal - totalExpenses)}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded h-4 overflow-hidden mt-2">
        <div
          className={`h-full ${
            savingsProgress >= 100
              ? "bg-green-500"
              : "bg-blue-500 dark:bg-blue-400"
          }`}
          style={{ width: `${Math.min(100, savingsProgress)}%` }}
        ></div>
      </div>

      {/* Goal Reached Alert */}
      {savingsProgress <= 0 && savingsGoal > 0 && (
        <p className="mt-2 text-green-500 font-semibold">
          🎉 Congrats! You've reached your goal!
        </p>
      )}
    </div>
  );
}

export default SavingsTracker;
