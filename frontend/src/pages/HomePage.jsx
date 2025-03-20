import React from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetTracker from "../components/BudgetTracker";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import SavingsTracker from "../components/SavingsTracker";

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Expense Tracker 💸</h1>
      </div>
      <BudgetTracker />
      <SavingsTracker/>
      <AddExpenseForm />
      <ExpenseList />
      <ExpenseChart />
    </div>
  );
}

export default HomePage;

