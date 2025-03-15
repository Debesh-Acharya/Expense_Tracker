import { useExpenses } from "../context/ExpenseContext";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function ExpenseItem({ expense }) {
  const { dispatch } = useExpenses();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(expense.name);
  const [newAmount, setNewAmount] = useState(expense.amount);

  const handleSave = () => {
    dispatch({
      type: "EDIT_EXPENSE",
      payload: { id: expense.id, name: newName, amount: parseFloat(newAmount) },
    });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 p-3 my-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      {isEditing ? (
        <div className="flex-1 flex justify-between gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-1/2 p-1 text-gray-700 dark:text-gray-200 bg-transparent border-b-2 border-blue-400 outline-none"
          />
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="w-1/4 p-1 text-gray-700 dark:text-gray-200 bg-transparent border-b-2 border-green-400 outline-none"
          />
          <button
            className="text-green-500 hover:text-green-700 dark:text-green-400"
            onClick={handleSave}
          >
            ✅
          </button>
        </div>
      ) : (
        <>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {expense.name}
          </span>
          <span className="text-green-600 dark:text-green-400 font-bold">
            ₹{expense.amount}
          </span>
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
              onClick={() =>
                dispatch({ type: "DELETE_EXPENSE", payload: expense.id })
              }
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ExpenseItem;
