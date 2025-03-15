import { useExpenses } from "../context/ExpenseContext";
import { useState, useEffect } from "react";

function ExpenseList() {
  const { expenses, dispatch } = useExpenses();
  const [undoExpense, setUndoExpense] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  // Handle expense deletion with undo
  const handleDelete = (expense) => {
    setUndoExpense(expense);
    dispatch({ type: "DELETE_EXPENSE", payload: expense.id });

    // Set a timeout for undo
    const timeout = setTimeout(() => setUndoExpense(null), 5000);
    setUndoTimeout(timeout);
  };

  // Restore the deleted expense
  const handleUndo = () => {
    if (undoExpense) {
      dispatch({ type: "ADD_EXPENSE", payload: undoExpense });
      clearTimeout(undoTimeout);
      setUndoExpense(null);
    }
  };

  // Format date to "DD MMM YYYY"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Start editing an expense
  const handleEdit = (expense) => {
    setEditingExpense(expense.id);
    setEditedExpense({ ...expense });
  };

  // Handle edited changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited expense
  const handleSave = () => {
    dispatch({ type: "EDIT_EXPENSE", payload: editedExpense });
    setEditingExpense(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingExpense(null);
  };

  // Ensure no stale undo reference after unmount
  useEffect(() => {
    return () => clearTimeout(undoTimeout);
  }, [undoTimeout]);

  return (
    <div className="p-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg transition-all duration-300">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        Expense List 💸
      </h2>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          No expenses added yet
        </p>
      ) : (
        <ul className="divide-y divide-gray-300 dark:divide-gray-600">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center py-2 px-3 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-all duration-200"
            >
              {/* Expense details */}
              <div className="flex flex-col text-gray-700 dark:text-gray-200">
                {editingExpense === expense.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="name"
                      value={editedExpense.name}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    />
                    <input
                      type="number"
                      name="amount"
                      value={editedExpense.amount}
                      onChange={handleChange}
                      className="p-1 rounded bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    />
                  </div>
                ) : (
                  <>
                    <span className="font-medium">{expense.name}</span>
                    <small className="text-sm text-gray-500 dark:text-gray-400">
                      {expense.category} • {formatDate(expense.date)}
                    </small>
                    {expense.notes && (
                      <small className="italic text-gray-500 dark:text-gray-400">
                        📝 {expense.notes}
                      </small>
                    )}
                  </>
                )}
              </div>

              {/* Amount */}
              {editingExpense === expense.id ? null : (
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  ₹{expense.amount}
                </span>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                {editingExpense === expense.id ? (
                  <>
                    <button
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition"
                      onClick={handleSave}
                    >
                      ✔️
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition"
                      onClick={handleCancel}
                    >
                      ❌
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 transition"
                      onClick={() => handleEdit(expense)}
                    >
                      ✏️
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
                      onClick={() => handleDelete(expense)}
                    >
                      ❌
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Undo snackbar */}
      {undoExpense && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          Expense deleted!{" "}
          <button
            className="ml-2 underline font-semibold hover:text-gray-200"
            onClick={handleUndo}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
