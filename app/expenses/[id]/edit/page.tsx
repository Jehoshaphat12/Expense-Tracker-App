"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTransactions } from "@/app/hook/useTransactions";

export default function EditTransactionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { transactions, updateTransaction } = useTransactions();

  const transaction = transactions.find((t) => t.id === Number(id));

  const [title, setTitle] = useState(transaction ? transaction.title : "");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount);
      setCategory(transaction.category);
      setDate(new Date(transaction.date).toISOString().split("T")[0]);
      setNote(transaction.note || "");
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;

    updateTransaction({
      ...transaction,
      title,
      amount: amount,
      category,
      date: new Date(date).toISOString(),
      note,
    });

    router.push("/expenses"); // TODO: show a toast
  };

  if (!transaction) {
    return (
      <p className="text-center text-red-500 mt-8">Transaction not found</p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Edit Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="amount" className="text-sm mb-3">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full py-3 px-4 focus:outline-2 outline-blue-600 bg-gray-200 rounded-xl"
          required
        />
        <label htmlFor="amount" className="text-sm mb-3">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount"
          className="w-full py-3 px-4 focus:outline-2 outline-blue-600 bg-gray-200 rounded-xl"
          required
        />
        <label htmlFor="amount" className="text-sm mb-3">
          Date created
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full py-3 px-4 focus:outline-2 outline-blue-600 bg-gray-200 rounded-xl"
          required
        />
        <label htmlFor="amount" className="text-sm mb-3">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full py-3 px-4 focus:outline-2 outline-blue-600 bg-gray-200 rounded-xl"
          required
        />
        <label htmlFor="amount" className="text-sm mb-3">
          Note (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note (optional)"
          className="w-full py-3 px-4 focus:outline-2 outline-blue-600 bg-gray-200 rounded-xl"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
