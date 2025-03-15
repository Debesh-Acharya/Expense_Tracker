// src/App.jsx
import { ExpenseProvider } from "./context/ExpenseContext";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-300">
        <HomePage />
        <Footer />
      </div>
    </ExpenseProvider>
  );
}

export default App;
