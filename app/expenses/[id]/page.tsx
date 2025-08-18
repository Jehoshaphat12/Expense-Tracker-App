"use client";

import { useTransactions } from "@/app/hook/useTransactions";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DeleteDialogueBox from "@/app/components/DeleteDialogueBox";
import { useCurrency } from "@/context/CurrencyContext";
import { currencies } from "@/app/components/CountryCodes";

export default function ExpenseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { transactions } = useTransactions();
  const { currency } = useCurrency();

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

  if (!transaction) {
    return (
      <p className="text-center text-red-500 mt-8">Transaction not found</p>
    );
  }

  function findCurrencySymbol(code: string) {
    for (const curr of currencies) {
      if (curr.code === code) {
        return curr.symbol;
      }
    }
  }

  return (
    <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 dark:text-gray-50 dark:border dark:border-gray-600 max-w-xl mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Transaction Details
      </h2>
      <div className="space-y-1 py-4 pb-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-600 px-6 rounded-2xl">
        <h5 className="text-sm text-gray-500 text-center font-semibold">
          {new Date(date).toLocaleDateString()}
        </h5>
        <h1
          className={`text-3xl pb-4 text-center font-semibold ${
            amount > 0 ? "text-green-500" : "text-red-500"
          } `}
        >
          {amount.toFixed(2)}
          {findCurrencySymbol(currency)}{" "}
        </h1>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
            <label className="text-sm mb-1 font-semibold">Title</label>
            <p className=" p-2 rounded">{title}</p>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-600">
            <label className="text-sm mb- font-semibold">Category</label>
            <p className=" p-2 rounded">{category}</p>
          </div>
        </div>
        <h3 className="font-semibold text-sm">Notes</h3>
        {note ? (
          <div>
            <label className="text-sm font-semibold mb-1">Note</label>
            <p className="p-2 rounded-2xl">{note}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No additional notes</p>
        )}
      </div>
      <button
        onClick={() => router.push(`/expenses/${id}/edit`)}
        className="mt-3 w-full bg-white dark:bg-gray-800 text-blue-600 font-semibold py-2 rounded-2xl dark:border dark:border-gray-600 hover:bg-blue-700 hover:text-white transition"
      >
        Edit Expense
      </button>
      {/* <button
        onClick={handleDelete}
        className="mt-3 w-full font-semibold bg-white text-red-600 py-2 rounded-2xl hover:bg-red-700 hover:text-white transition"
      >
        Delete Expense
      </button> */}
      <DeleteDialogueBox transactionId={transaction.id} />
    </div>
  );
}
