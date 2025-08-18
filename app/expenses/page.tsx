"use client";
import ExpenseList from "../components/ExpenseList";
import { useTransactions } from "@/app/hook/useTransactions";

export default function ExpensesPage() {
  const { transactions } = useTransactions();
  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 text-center">Your Expenses</h2>
      <div className="h-[80dvh] flex flex-col overflow-y-auto overflow-x-hidden md:p-4">
        <ExpenseList transactions={transactions} />
      </div>
    </div>
  );
}
