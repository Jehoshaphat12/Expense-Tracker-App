"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveExpenseToStorage } from "@/lib/storage";
import { useTransactions } from "@/app/hook/useTransactions";
import { FiDollarSign } from "react-icons/fi";

export default function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const router = useRouter();
  const { addTransaction } = useTransactions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };
    addTransaction(newExpense);
    // saveExpenseToStorage(newExpense);
    router.push("/expenses");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Category (e.g. Food, Transport)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Expense
      </button>
    </form>
  );
}
