"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPiggyBank } from "react-icons/bs";
import { Modal } from "../page";
import { useCurrency } from "@/context/CurrencyContext";
import { IoIosMore } from "react-icons/io";
import { useLocalStorageState } from "@/app/hook/useLocalStorageState";
import { currencies } from "@/app/components/CountryCodes";

export default function FinancePages() {
  const { currency } = useCurrency();

  //   Modal States
  const [openSavings, setOpenSavings] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [savedAmount, setSavedAmount] = useState<number | "">("");
  const [savings, setSavings] = useLocalStorageState<
    { title: string; amount: number; saved: number }[]
  >("savings",[]);

  // For edit functionality
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  

  // ----- Handlers -------------------
  const addOrEditSaving = (title: string, amount: number, saved: number) => {
    if (editingIndex !== null) {
      // Edit mode
      const updated = [...savings];
      updated[editingIndex] = { title, amount, saved };
      setSavings(updated);
      setEditingIndex(null);
    } else {
      // Add new
      setSavings([...savings, { title, amount, saved }]);
    }
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updated = savings.filter((_, i) => i !== deleteIndex);
      setSavings(updated);
      setDeleteIndex(null);
      setOpenDelete(false);
    }
  };

  const handleEdit = (index: number) => {
    const s = savings[index];
    setTitle(s.title);
    setAmount(s.amount);
    setSavedAmount(s.saved);
    setEditingIndex(index);
    setOpenSavings(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    addOrEditSaving(title, Number(amount), Number(savedAmount) || 0);
    // Reset form
    setTitle("");
    setAmount("");
    setSavedAmount("");
    setOpenSavings(false);
  };

   function findCurrencySymbol(code: string) {
    for (const curr of currencies) {
      if (curr.code === code) {
        return curr.symbol;
      }
    }
  }

  return (
    <div className="max-w-3xl  dark:bg-gray-800 dark:text-gray-50">
      {/* Tabs */}
      <div className="flex justify-around mb-0  py-2">
        <Link
          href={"#"}
          className="px-4 py-2 font-semibold text-blue-500 dark:text-gray-400"
        >
          Savings
        </Link>
        <Link
          href={"/savings-reminder-budget/reminder"}
          className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-400"
        >
          Reminders
        </Link>
        <Link
          href={"/savings-reminder-budget/budgets"}
          className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-400"
        >
          Budgets
        </Link>
      </div>

      {/* Page Content */}
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-50">
        <div className="p-4 px-5">
          <h2 className="text-xl font-bold mb-4">💰 Savings Goals</h2>
          <p className="text-gray-600 mb-4">Track your saving goals here.</p>
        </div>
        <div className=" rounded-xl p-4 shadow-lg bg-white  dark:bg-gray-800">
          {savings.length > 0 ? (
            <>
              <h1 className="font-semibold mb-4 ">All Goals</h1>
              <ul className="mt-3 space-y-2">
                {savings.map((s, i) => (
                  <li
                    key={i}
                     onClick={() => handleEdit(i)}
                    className="flex items-center space-x-3 p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-50"
                  >
                    <div className="bg-gray-300 p-2 rounded-lg dark:bg-gray-700 dark:text-gray-50 text-gray-500">
                      <BsPiggyBank size={30} />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">{s.title}</h3>
                        <div className="relative group">
                          <button className="text-gray-500">
                            <IoIosMore size={30} />
                          </button>
                          {/* Dropdown on hover */}
                          <div className="absolute right-0 hidden group-hover:block bg-white dark:bg-gray-700 shadow-md rounded-lg text-sm">
                            <button
                              onClick={() => handleEdit(i)}
                              className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setDeleteIndex(i);
                                setOpenDelete(true);
                              }}
                              className="block w-full px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 my-1 overflow-hidden">
                        <div
                          className="bg-blue-500 h-3 transition-all duration-300"
                          style={{ width: `${(s.saved / s.amount) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-gray-400 font-semibold text-sm">
                        <span>
                          {findCurrencySymbol(currency)} {s.saved.toFixed(2)}
                        </span>
                        <span>
                          {findCurrencySymbol(currency)} {s.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500">No savings goals yet.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white dark:text-gray-50 rounded-lg"
            onClick={() => setOpenSavings(true)}
          >
            + Add Goal
          </button>
        </div>
      </div>

      {/* Savings Modal */}
      <Modal
        isOpen={openSavings}
        onClose={() => {
          setOpenSavings(false);
          setEditingIndex(null);
          setTitle("");
          setAmount("");
          setSavedAmount("");
        }}
        title={editingIndex !== null ? "Edit Savings Goal" : "Add Savings Goal"}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Goal Name"
            required
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            type="number"
            placeholder="Target Amount"
            required
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            value={savedAmount}
            onChange={(e) => setSavedAmount(parseFloat(e.target.value))}
            type="number"
            placeholder="Amount Saved"
            required
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl"
          >
            {editingIndex !== null ? "Update Goal" : "Save Goal"}
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Confirm Delete"
      >
        <p className="mb-4">
          Are you sure you want to delete this savings goal?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setOpenDelete(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
