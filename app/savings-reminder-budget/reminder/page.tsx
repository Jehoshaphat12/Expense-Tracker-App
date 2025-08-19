"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPiggyBank } from "react-icons/bs";
import { Modal } from "../page";
import { useCurrency } from "@/context/CurrencyContext";
import { IoIosMore } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { useLocalStorageState } from "@/app/hook/useLocalStorageState";
import { currencies } from "@/app/components/CountryCodes";


export default function RemindersPage() {
  const { currency } = useCurrency();

  //   Modal States
  const [openReminders, setOpenReminders] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "" | undefined>("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useLocalStorageState<
    { title: string; amount?: number; date: string; createdAt: string }[]
  >("reminders", []);

  // For edit functionality
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


  // ----- Handlers -------------------
  const addOrEditReminder = (title: string, date: string, amount?: number) => {
    if (editingIndex !== null) {
      // Edit mode
      const updated = [...reminders];
      updated[editingIndex] = { ...updated[editingIndex], title, amount, date };
      setReminders(updated);
      setEditingIndex(null);
    } else {
      // Add new
      setReminders([
        ...reminders,
        { title, amount, date, createdAt: new Date().toISOString() },
      ]);
    }
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updated = reminders.filter((_, i) => i !== deleteIndex);
      setReminders(updated);
      setDeleteIndex(null);
      setOpenDelete(false);
    }
  };

  const handleEdit = (index: number) => {
    const r = reminders[index];
    setTitle(r.title);
    setAmount(r.amount);
    setDate(r.date);
    setEditingIndex(index);
    setOpenReminders(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    addOrEditReminder(title, date, Number(amount));
    // Reset form
    setTitle("");
    setAmount("");
    setDate("");
    setOpenReminders(false);
  };

  function getReminderProgress(dueDate: string, createdAt: string) {
    const start = new Date(createdAt).getTime();
    const end = new Date(dueDate).getTime();
    const now = Date.now();

    if (now >= end) return 100; // already due
    if (now <= start) return 0; // just created

    return Math.min(100, ((now - start) / (end - start)) * 100);
  }

  function isOverdue(dueDate: string) {
    return Date.now() > new Date(dueDate).getTime();
  }

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
          href={"/savings-reminder-budget/savings"}
          className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-400"
        >
          Savings
        </Link>
        <Link
          href={"#"}
          className="px-4 py-2 font-semibold text-blue-500 dark:text-gray-400"
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
          <h2 className="text-xl font-bold mb-4">⏰ Reminders</h2>
          <p className="text-gray-600 mb-4">
            Set reminders for bills and recurring payments.
          </p>
        </div>
        <div className=" rounded-xl p-4 shadow-lg bg-white  dark:bg-gray-800">
          {reminders.length > 0 ? (
            <>
              <h1 className="font-semibold mb-4 ">All Reminders</h1>
              <ul className="mt-3 space-y-2">
                {reminders.map((r, i) => (
                  <li
                    key={i}
                    // onClick={() => handleEdit(i)}
                    className="flex items-center space-x-3 p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-50"
                  >
                    <div className="bg-gray-300 p-2 rounded-lg dark:bg-gray-700 dark:text-gray-50 text-gray-500">
                      <LuCalendarClock size={30} />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">{r.title}</h3>
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
                          className={`h-2 transition-all duration-300 ${
                            isOverdue(r.date) ? "bg-red-500" : "bg-green-500"
                          }`}
                          style={{
                            width: `${getReminderProgress(
                              r.date,
                              r.createdAt
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-gray-400  text-sm">
                        <span>
                          {r.amount && (
                            <>
                              {findCurrencySymbol(currency)}{" "}
                              {r.amount}
                            </>
                          )}
                        </span>
                        <p
                          className={`text-sm ${
                            isOverdue(r.date) ? "text-red-600" : ""
                          }`}
                        >
                          {isOverdue(r.date)
                            ? "Overdue"
                            : `${Math.round(
                                getReminderProgress(r.date, r.createdAt)
                              )}% time passed`}
                        </p>
                        <span>Due on: {r.date}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500">No reminders yet.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white dark:text-gray-50 rounded-lg"
            onClick={() => setOpenReminders(true)}
          >
            + Set Reminder
          </button>
        </div>
      </div>

      {/* reminders Modal */}
      <Modal
        isOpen={openReminders}
        onClose={() => {
          setOpenReminders(false);
          setEditingIndex(null);
          setTitle("");
          setAmount("");
          setDate("");
        }}
        title={
          editingIndex !== null ? "Edit reminders Goal" : "Add reminders Goal"
        }
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
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            type="number"
            placeholder="Amount (optional)"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
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
        <p className="mb-4">Are you sure you want to delete this reminder?</p>
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
