"use client";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/app/components/Modal";
import { useCurrency } from "@/context/CurrencyContext";
import { IoIosMore } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { useLocalStorageState } from "@/app/hook/useLocalStorageState";
import { currencies } from "@/app/components/CountryCodes";
import { useTransactions } from "@/app/hook/useTransactions";
import { GiPieChart } from "react-icons/gi";
import { AiOutlinePieChart } from "react-icons/ai";
import toast from "react-hot-toast";

interface Budget {
  title: string;
  limit?: number;
  startDate: string; // full ISO string with date+time
  endDate: string;   // full ISO string with date+time
  createdAt: string;
}

export default function BudgetsPage() {
  const { currency } = useCurrency();
  const { transactions } = useTransactions();

  // Modal States
  const [openBudgets, setOpenBudgets] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState<number | "" | undefined>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [budgets, setBudgets] = useLocalStorageState<Budget[]>("budgets", []);

  // For edit & delete
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // ----- Handlers -------------------
  const addOrEditBudget = (
    title: string,
    startDate: string,
    endDate: string,
    limit?: number
  ) => {

    try {
      if (editingIndex !== null) {
        // Edit mode
        const updated = [...budgets];
        updated[editingIndex] = {
          ...updated[editingIndex],
          title,
          limit,
          startDate,
          endDate,
        };
        setBudgets(updated);
        setEditingIndex(null);
        toast.success("Budget edited successfully.");
      } else {
        // Add new
        setBudgets([
          ...budgets,
          { title, limit, startDate, endDate, createdAt: new Date().toISOString() },
        ]);
        toast.success("Budget added successfully.");
      }

    } catch (err) {
      toast.error("Failed to add or edit budget. Try again.");
      console.error("Budget error:", err);
    }
  };

  const handleDelete = () => {
    try {
      if (deleteIndex !== null) {
        setBudgets(budgets.filter((_, i) => i !== deleteIndex));
        setDeleteIndex(null);
        setOpenDelete(false);
      }
      toast.success("Budget deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete budget. Try again.");
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (index: number) => {
    const b = budgets[index];
    setTitle(b.title);
    setLimit(b.limit ?? "");
    setStartDate(b.startDate);
    setEndDate(b.endDate);
    setEditingIndex(index);
    setOpenBudgets(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !endDate) return;
    addOrEditBudget(title, startDate, endDate, limit ? Number(limit) : undefined);
    // Reset form
    setTitle("");
    setLimit("");
    setStartDate("");
    setEndDate("");
    setOpenBudgets(false);
  };

  // ---- Core Calculation ----
  function calculateSpent(budget: Budget) {
    const start = new Date(budget.startDate);
    const end = new Date(budget.endDate);

    return transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          t.category === budget.title &&
          t.amount < 0 && // spending only
          tDate >= start &&
          tDate <= end
        );
      })
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  }

  function getBudgetProgress(budget: Budget) {
    const spent = calculateSpent(budget);
    if (!budget.limit || budget.limit === 0) return 0;
    return Math.min((spent / budget.limit) * 100, 100);
  }

  function isOverdue(endDate: string) {
    return Date.now() > new Date(endDate).getTime();
  }

  function findCurrencySymbol(code: string) {
    const curr = currencies.find((c) => c.code === code);
    return curr ? curr.symbol : "";
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
          Reminder
        </Link>
        <Link href={"#"} className="px-4 py-2 font-semibold text-blue-500">
          Budgets
        </Link>
      </div>

      {/* Page Content */}
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-50">
        <div className="p-4 px-5">
          <h2 className="text-xl font-bold mb-4">📊 Budgets</h2>
          <p className="text-gray-600 mb-4">Plan and monitor your spending.</p>
        </div>
        <div className=" rounded-xl p-4 shadow-lg bg-white  dark:bg-gray-800">
          {budgets.length > 0 ? (
            <>
              <h1 className="font-semibold mb-4 ">All Budgets</h1>
              <ul className="mt-3 space-y-2">
                {budgets.map((b, i) => {
                  const spent = calculateSpent(b);
                  const remaining = b.limit ? b.limit - spent : 0;

                  return (
                    <li
                      key={i}
                      className="flex items-center space-x-3 p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-50"
                    >
                      <div className="bg-gray-300 p-2 rounded-lg dark:bg-gray-700 dark:text-gray-50 text-gray-500">
                        <AiOutlinePieChart size={22}/>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-lg">{b.title}</h3>
                          <div className="relative group">
                            <button className="text-gray-500">
                              <IoIosMore size={30} />
                            </button>
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
                              isOverdue(b.endDate) ? "bg-red-500" : "bg-green-500"
                            }`}
                            style={{ width: `${getBudgetProgress(b)}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-gray-400  text-xs">
                          <span>
                            {b.limit && (
                              <>
                                {findCurrencySymbol(currency)} {b.limit}
                              </>
                            )}
                          </span>
                          <p
                            className={`text-xs ${
                              isOverdue(b.endDate) ? "text-red-600" : ""
                            }`}
                            aria-label="Overdue"
                          >
                            {isOverdue(b.endDate)
                              ? "Overdue"
                              : `${Math.round(getBudgetProgress(b))}% used`}
                          </p>
                          <span>
                            {spent > 0 && b.limit
                              ? `Bal: ${findCurrencySymbol(currency)} ${remaining}`
                              : ""}
                          </span>
                          <span>
                            {/* {new Date(b.startDate).toLocaleString()} →{" "} */}
                            {new Date(b.endDate).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
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
          setStartDate("");
          setEndDate("");
        }}
        title={editingIndex !== null ? "Edit Budget" : "Add Budget"}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Budget Category"
            required
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            value={limit}
            onChange={(e) =>
              setLimit(e.target.value === "" ? "" : Number(e.target.value))
            }
            type="number"
            placeholder="Limit (optional)"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <div className="flex space-x-2">
            {/* ✅ use datetime-local instead of date */}
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="datetime-local"
              placeholder="Start Date"
              required
              className="w-1/2 p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
            />
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="datetime-local"
              placeholder="End Date"
              required
              className="w-1/2 p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl"
          >
            {editingIndex !== null ? "Update Budget" : "Save Budget"}
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Confirm Delete"
      >
        <p className="mb-4">Are you sure you want to delete this budget?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setOpenDelete(false)}
            className="px-4 py-2 bg-gray-300 dark:text-gray-700 rounded-lg"
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
