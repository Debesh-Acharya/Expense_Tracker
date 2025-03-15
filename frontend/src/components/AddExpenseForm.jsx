import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

function AddExpenseForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const { dispatch } = useExpenses();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category,
        date,
        notes,
      },
    });

    setName("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-2">Add Expense</h2>

      {/* Expense Name Input */}
      <input
        type="text"
        placeholder="Expense Name"
        className="w-full p-2 mt-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 mt-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 mt-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      >
        <option value="Food">🍔 Food</option>
        <option value="Transport">🚗 Transport</option>
        <option value="Shopping">🛍️ Shopping</option>
        <option value="Entertainment">🎮 Entertainment</option>
        <option value="Bills">💡 Bills</option>
        <option value="Other">💸 Other</option>
      </select>

      {/* Date Input */}
      <input
        type="date"
        className="w-full p-2 mt-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Notes Input */}
      <textarea
        placeholder="Add notes (optional)"
        className="w-full p-2 mt-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      {/* Add Expense Button */}
      <button className="mt-4 bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition">
        Add Expense
      </button>
    </form>
  );
}

export default AddExpenseForm;
