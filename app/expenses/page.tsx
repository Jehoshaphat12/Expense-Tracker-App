"use client";
import ExpenseList from "../components/ExpenseList";
import { useTransactions } from "@/app/hook/useTransactions";

export default function ExpensesPage() {
  const { transactions } = useTransactions();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-4">
        <ExpenseList transactions={transactions} />
      </div>
    </div>
  );
}
