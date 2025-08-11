// export function getExpensesFromStorage() {
//   if (typeof window === "undefined") return [];
//   const data = localStorage.getItem("expenses");
//   return data ? JSON.parse(data) : [];
// }

// export function saveExpenseToStorage(expense: string) {
//   const existing = getExpensesFromStorage();
//   existing.push(expense);
//   localStorage.setItem("expenses", JSON.stringify(existing));
// }
