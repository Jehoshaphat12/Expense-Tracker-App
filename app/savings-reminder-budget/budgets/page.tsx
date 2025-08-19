"use client";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/app/components/Modal";
import { useCurrency } from "@/context/CurrencyContext";
import { IoIosMore } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { useLocalStorageState } from "@/app/hook/useLocalStorageState";
import { currencies } from "@/app/components/CountryCodes";


export default function BudgetsPage() {
  const { currency } = useCurrency();

  //   Modal States
  const [openBudgets, setOpenBudgets] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState<number | "" | undefined>("");
  const [period, setPeriod] = useState("");
  const [budgets, setBudgets] = useLocalStorageState<
    { title: string; limit?: number; period: string; createdAt: string }[]
  >("budgets", []);

  // For edit functionality
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


  // ----- Handlers -------------------
  const addOrEditReminder = (title: string, period: string, limit?: number) => {
    if (editingIndex !== null) {
      // Edit mode
      const upperiodd = [...budgets];
      upperiodd[editingIndex] = { ...upperiodd[editingIndex], title, limit, period };
      setBudgets(upperiodd);
      setEditingIndex(null);
    } else {
      // Add new
      setBudgets([
        ...budgets,
        { title, limit, period, createdAt: new Date().toISOString() },
      ]);
    }
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const upperiodd = budgets.filter((_, i) => i !== deleteIndex);
      setBudgets(upperiodd);
      setDeleteIndex(null);
      setOpenDelete(false);
    }
  };

  const handleEdit = (index: number) => {
    const r = budgets[index];
    setTitle(r.title);
    setLimit(r.limit);
    setPeriod(r.period);
    setEditingIndex(index);
    setOpenBudgets(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !period) return;
    addOrEditReminder(title, period, Number(limit));
    // Reset form
    setTitle("");
    setLimit("");
    setPeriod("");
    setOpenBudgets(false);
  };

  function getReminderProgress(dueperiod: string, createdAt: string) {
    const start = new Date(createdAt).getTime();
    const end = new Date(dueperiod).getTime();
    const now = Date.now();

    if (now >= end) return 100; // already due
    if (now <= start) return 0; // just created

    return Math.min(100, ((now - start) / (end - start)) * 100);
  }

  function isOverdue(dueperiod: string) {
    return Date.now() > new Date(dueperiod).getTime();
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
          href={"/savings-reminder-budget/reminder"}
          className="px-4 py-2 font-semibold text-gray-600 dark:text-gray-400"
          >
          budgets
        </Link>
        <Link
              href={"#"}
          className="px-4 py-2 font-semibold text-blue-500 dark:text-gray-400"
        >
          Budgets
        </Link>
      </div>

      {/* Page Content */}
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-50">
        <div className="p-4 px-5">
          <h2 className="text-xl font-bold mb-4">📊 Budgets</h2>
          <p className="text-gray-600 mb-4">
            Plan and monitor your spending.
          </p>
        </div>
        <div className=" rounded-xl p-4 shadow-lg bg-white  dark:bg-gray-800">
          {budgets.length > 0 ? (
            <>
              <h1 className="font-semibold mb-4 ">All Budgets</h1>
              <ul className="mt-3 space-y-2">
                {budgets.map((b, i) => (
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
                        <h3 className="font-semibold text-lg">{b.title}</h3>
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
                            isOverdue(b.period) ? "bg-red-500" : "bg-green-500"
                          }`}
                          style={{
                            width: `${getReminderProgress(
                              b.period,
                              b.createdAt
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-gray-400  text-sm">
                        <span>
                          {b.limit && (
                            <>
                              {findCurrencySymbol(currency)}{" "}
                              {b.limit}
                            </>
                          )}
                        </span>
                        <p
                          className={`text-sm ${
                            isOverdue(b.period) ? "text-red-600" : ""
                          }`}
                        >
                          {isOverdue(b.period)
                            ? "Overdue"
                            : `${Math.round(
                                getReminderProgress(b.period, b.createdAt)
                              )}% time passed`}
                        </p>
                        <span>Due on: {b.period}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500">No budgets set yet.</p>
          )}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white dark:text-gray-50 rounded-lg"
            onClick={() => setOpenBudgets(true)}
          >
            + Add Budget
          </button>
        </div>
      </div>

      {/* budgets Modal */}
      <Modal
        isOpen={openBudgets}
        onClose={() => {
          setOpenBudgets(false);
          setEditingIndex(null);
          setTitle("");
          setLimit("");
          setPeriod("");
        }}
        title={
          editingIndex !== null ? "Edit budgets Goal" : "Add budgets Goal"
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Budget Name"
            required
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            value={limit}
            onChange={(e) =>
              setLimit(e.target.value === "" ? "" : Number(e.target.value))
            }
            type="number"
            placeholder="limit (optional)"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            type="period"
            placeholder="limit Saved"
            required
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl"
          >
            {editingIndex !== null ? "Upperiod Goal" : "Save Goal"}
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
