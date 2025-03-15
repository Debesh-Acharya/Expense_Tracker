function Header() {
  return (
    <header className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">💸 Expense Tracker</h1>
    <DarkModeToggle />
  </header>
  );
}
export default Header;