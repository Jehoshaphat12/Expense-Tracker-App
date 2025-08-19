"use client";
import { useState } from "react";

// Resusable Component
function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 px-3 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-50 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FinancePages() {
  const [activeTab, setActiveTab] = useState<
    "savings" | "reminders" | "budget"
  >("savings");

  //   Modal States
  const [openSavings, setOpenSavings] = useState(false)
  const [openReminders, setOpenReminders] = useState(false)
  const [openBudget, setOpenBudget] = useState(false)

  return (
    <div className="max-w-3xl  dark:bg-gray-800 dark:text-gray-50">
      {/* Tabs */}
      <div className="flex justify-around mb-0  py-2">
        <button
          onClick={() => setActiveTab("savings")}
          className={`px-4 py-2 font-semibold  ${
            activeTab === "savings"
              ? "  text-blue-500"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Savings
        </button>
        <button
          onClick={() => setActiveTab("reminders")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "reminders"
              ? "  text-blue-500"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Reminders
        </button>
        <button
          onClick={() => setActiveTab("budget")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "budget"
              ? "  text-blue-500"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Budget
        </button>
      </div>

      {/* Page Content */}
      {activeTab === "savings" && (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-50">
          <div className="p-4 px-5">
            <h2 className="text-xl font-bold mb-4">💰 Savings Goals</h2>
            <p className="text-gray-600 mb-4">Track your saving goals here.</p>
          </div>
          <div className=" rounded-xl p-4 shadow-lg bg-white  ">
            <p className="text-gray-500">No savings goals yet.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white dark:text-gray-50 rounded-lg"
            onClick={() => setOpenSavings(true)}
            >
              + Add Goal
            </button>
          </div>
        </div>
      )}

      {activeTab === "reminders" && (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-50">
          <div className="p-4 px-5">
            <h2 className="text-xl font-bold mb-4">⏰ Reminders</h2>
            <p className="text-gray-600 mb-4">
              Set reminders for bills and recurring payments.
            </p>
          </div>
          <div className=" rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800">
            <p className="text-gray-500">No reminders yet.</p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white dark:text-gray-50 rounded-lg"
            onClick={() => setOpenReminders(true)}
            >
              + Add Reminder
            </button>
          </div>
        </div>
      )}

      {activeTab === "budget" && (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-50">
          <div className="p-4 px-5">
            <h2 className="text-xl font-bold mb-4">📊 Budgets</h2>
            <p className="text-gray-600 mb-4">
              Plan and monitor your spending.
            </p>
          </div>
          <div className=" rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800">
            <p className="text-gray-500">No budgets set yet.</p>
            <button className="mt-4 px-4 py-2 bg-purple-500 text-white dark:text-gray-50 rounded-lg"
            onClick={() => setOpenBudget(true)}
            >
              + Add Budget
            </button>
          </div>
        </div>
      )}

      {/* Savings Modal */}
      <Modal isOpen={openSavings} onClose={() => setOpenSavings(false)} title="Add Savings Goal">
        <form className="space-y-4">
          <input type="text" placeholder="Goal Name" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <input type="number" placeholder="Target Amount" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <input type="date" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl">
            Save Goal
          </button>
        </form>
      </Modal>

       {/* Reminders Modal */}
      <Modal isOpen={openReminders}  onClose={() => setOpenReminders(false)} title="Add Reminder">
        <form className="space-y-4">
          <input type="text" placeholder="Reminder Title" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <input type="date" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <input type="time" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-xl">
            Save Reminder
          </button>
        </form>
      </Modal>

      {/* Budget Modal */}
      <Modal isOpen={openBudget} onClose={() => setOpenBudget(false)} title="Add Budget">
        <form className="space-y-4">
          <input type="text" placeholder="Category (e.g. Food, Rent)" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <input type="number" placeholder="Budget Amount" className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50" />
          <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-xl">
            Save Budget
          </button>
        </form>
      </Modal>
    </div>
  );
}
