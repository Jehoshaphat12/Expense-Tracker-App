" use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransactions, Transaction } from "@/app/hook/useTransactions";

export default function EditTransactionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = parseInt(searchParams.get("id") || "");
  const { transactions, updateTransaction } = useTransactions();

  const [formData, setFormData] = useState<Omit<Transaction, "icon" | "color">>(
    {
      id,
      title: "",
      amount: 0,
      category: "",
      date: "",
    }
  );

  useEffect(() => {
    const existing = transactions.find((t) => t.id === id);
    if (existing) {
      setFormData({
        id: existing.id,
        title: existing.title,
        amount: existing.amount,
        category: existing.category,
        date: existing.date,
      });
    }
  }, [id, transactions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTransaction({
      ...formData,
      icon: undefined, // Assuming icon is not needed for edit
      color: formData.amount > 0 ? "green" : "red", // Set color based on amount
    });
    router.push("/expenses");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full border p-2 rounded"
        placeholder="Title"
      />
      <input
        type="number"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: parseFloat(e.target.value) })
        }
        className="w-full border p-2 rounded"
        placeholder="Amount"
      />
      <input
        type="text"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full border p-2 rounded"
        placeholder="Category"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </form>
  );
}
