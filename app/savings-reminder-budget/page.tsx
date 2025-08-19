"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPiggyBank } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

// Resusable Component
export function Modal({
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
    <div className="fixed inset-0 backdrop-blur-xs bg-black/60 px-3 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-50 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold ">{title}</h2>
        <button onClick={onClose} className="cursor-pointer"><IoMdClose size={25}/></button>
        </div>
        {children}
        <div className="flex justify-end mt-4">
          {/* <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            Close
          </button> */}
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
  const [openSavings, setOpenSavings] = useState(false);
  const [openReminders, setOpenReminders] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  const [savings, setSavings] = useState<{ title: string; amount: number; saved: number }[]>(
    []
  );
  const [reminders, setReminders] = useState<
    { title: string; date: string; amount?: number }[]
  >([]);
  const [budgets, setBudgets] = useState<
    { category: string; limit: number; period: string }[]
  >([]);

  //   Load from localstorage on mount
//   useEffect(() => {
//     const savedSavings = localStorage.getItem("savings");
//     const savedReminders = localStorage.getItem("reminders");
//     const savedBudgets = localStorage.getItem("budgets");

//     if (savedSavings) setSavings(JSON.parse(savedSavings));
//     if (savedReminders) setSavings(JSON.parse(savedReminders));
//     if (savedBudgets) setSavings(JSON.parse(savedBudgets));
//   }, []);

//   // -------- Save to localstorage whenever state changes -----
//   useEffect(() => {
//     localStorage.setItem("savings", JSON.stringify(savings));
//   }, [savings]);
//   useEffect(() => {
//     localStorage.setItem("reminders", JSON.stringify(reminders));
//   }, [reminders]);
//   useEffect(() => {
//     localStorage.setItem("budgets", JSON.stringify(budgets));
//   }, [budgets]);

  // ----- Handlers -------------------
  const addSaving = (title: string, amount: number, saved: number) => {
    setSavings([...savings, { title, amount, saved }]);
  };
  const addReminder = (title: string, date: string, amount?: number) => {
    setReminders([...reminders, { title, date, amount }]);
  };
  const addBudget = (category: string, limit: number, period: string) => {
    setBudgets([...budgets, { category, limit, period }]);
  };

  return (
    <div className="max-w-3xl  dark:bg-gray-800 dark:text-gray-50">
      {/* Tabs */}
      <div className="flex justify-around mb-0  py-2">
        <Link
        href={"/savings-reminder-budget/savings"}
          onClick={() => setActiveTab("savings")}
          className={`px-4 py-2 font-semibold  ${
            activeTab === "savings"
              ? "  text-blue-500"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Savings
        </Link>
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
          <div className=" rounded-xl p-4 shadow-lg bg-white  dark:bg-gray-800">
            {savings ? (
                <>
                <h1 className="font-semibold mb-4 ">All Goals</h1>
              <ul className="mt-3 space-y-2">
                {savings.map((s, i) => (
                    <li key={i} className="flex p-2 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-50">
                        <div className="bg-gray-300 dark:bg-gray-700 dark:text-gray-50 text-gray-500">
                            <BsPiggyBank size={20}/>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="font-semibold text-xl">{s.title}</h3>
                        <input type="range"></input>
                        <div className="flex justify-between items-center">
                            <span>{s.saved}</span>
                            <span>{s.amount}</span>
                        </div>
                        </div>
                    {s.title} - ${s.amount}
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
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white dark:text-gray-50 rounded-lg"
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
            <button
              className="mt-4 px-4 py-2 bg-purple-500 text-white dark:text-gray-50 rounded-lg"
              onClick={() => setOpenBudget(true)}
            >
              + Add Budget
            </button>
          </div>
        </div>
      )}

      {/* Savings Modal */}
      <Modal
        isOpen={openSavings}
        onClose={() => setOpenSavings(false)}
        title="Add Savings Goal"
      >
        <form className="space-y-4" onSubmit={() => addSaving()}>
          <input
            type="text"
            placeholder="Goal Name"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            type="number"
            placeholder="Target Amount"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            type="number"
            placeholder="Amount Saved"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          {/* <input
            type="date"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          /> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl"
          >
            Save Goal
          </button>
        </form>
      </Modal>

      {/* Reminders Modal */}
      <Modal
        isOpen={openReminders}
        onClose={() => setOpenReminders(false)}
        title="Add Reminder"
      >
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Reminder Title"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            type="date"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            type="time"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-xl"
          >
            Save Reminder
          </button>
        </form>
      </Modal>

      {/* Budget Modal */}
      <Modal
        isOpen={openBudget}
        onClose={() => setOpenBudget(false)}
        title="Add Budget"
      >
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Category (e.g. Food, Rent)"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <input
            type="number"
            placeholder="Budget Amount"
            className="w-full p-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-900 dark:text-gray-50"
          />
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-xl"
          >
            Save Budget
          </button>
        </form>
      </Modal>
    </div>
  );
}
