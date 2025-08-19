"use client";

import { useTransactions } from "@/app/hook/useTransactions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddExpensePage() {
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const router = useRouter();
  const { addTransaction } = useTransactions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomeTitle || !incomeAmount) return;
    const newIncome = {
      id: Date.now(),
      title: incomeTitle,
      amount: parseFloat("-" + incomeAmount),
      category,
      note,
      date: new Date().toISOString(),
    };
    addTransaction(newIncome);
    router.push("/expenses");
    setIncomeTitle("");
    setIncomeAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <>
      <div className="flex flex-col items-center px-8">
        <h2 className="text-2xl text-center mb-6 pt-3">Add Expense</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-4 w-full lg:max-w-[60%]"
        >
          <div className="w-full">
            <label htmlFor="title" className="text-sm mb-2">
              Expense Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Expense Title"
              value={incomeTitle}
              onChange={(e) => setIncomeTitle(e.target.value)}
              className="w-full bg-gray-200 dark:bg-gray-900 dark:text-gray-50 px-4 py-2 rounded-xl focus:outline-2 outline-blue-600"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="amount" className="text-sm mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Expense Amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              className="w-full bg-gray-200 dark:bg-gray-900 dark:text-gray-50 px-4 py-2 rounded-xl focus:outline-2 outline-blue-600"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="category" className="text-sm mb-2">
              Category
            </label>
            <input
              name="category"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-200 dark:bg-gray-900 dark:text-gray-50 px-4 py-2 rounded-xl focus:outline-2 outline-blue-600"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="note" className="text-sm mb-2">
              Note (Optional)
            </label>
            <textarea
              name="note"
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full bg-gray-200 dark:bg-gray-900 dark:text-gray-50 focus:outline-2 outline-blue-600 px-4 py-3 rounded-2xl"
            />
          </div>

          <button
            type="submit"
            aria-label="Add Income"
            className="w-full bg-blue-600 border-none py-2 rounded-2xl text-white mt-6"
          >
            Add Expense
          </button>
        </form>
      </div>
    </>
  );
}
