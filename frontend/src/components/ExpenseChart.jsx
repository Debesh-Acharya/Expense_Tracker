import React from "react";
import { Pie } from "react-chartjs-2";
import { useExpenses } from "../context/ExpenseContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart() {
  const { expenses } = useExpenses();

  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-4">
        No data to visualize yet 😔
      </p>
    );
  }

  const categories = expenses.reduce((acc, expense) => {
    const category = expense.category || "Other";
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9C27B0",
          "#FF9800",
        ],
        hoverBackgroundColor: [
          "#FF4D6A",
          "#1E90FF",
          "#FFB100",
          "#45D78A",
          "#8A2BE2",
          "#FB8C00",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-2 text-center">Expense Breakdown 📊</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default ExpenseChart;
