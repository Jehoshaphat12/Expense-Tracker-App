"use client";
import ExpenseBalance from "../components/ExpenseBalance";
import ExpenseList from "../components/ExpenseList";
import { useTransactions } from "@/app/hook/useTransactions";

export default function ExpensesPage() {
  const { transactions } = useTransactions();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
      <div className="overflow-auto h-[35rem]">
        <ExpenseList transactions={transactions} />
      </div>
    </div>
  );
}
