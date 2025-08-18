"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
} from "recharts";
import { useTransactions } from "@/app/hook/useTransactions";
import { sortList } from "../components/ExpenseList";
import { IoIosMore } from "react-icons/io";

// Colors
const COLORS = ["#22c55e", "#ef4444"]; // green for income, red for expenses

// Helper: get date filters
function getDateRange(filter: string) {
  const today = new Date();
  const start = new Date();
  const end = new Date();

  if (filter === "today") {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  } else if (filter === "yesterday") {
    start.setDate(today.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    end.setDate(today.getDate() - 1);
    end.setHours(23, 59, 59, 999);
  } else if (filter === "this Week") {
    const firstDay = today.getDate() - today.getDay();
    start.setDate(firstDay);
    start.setHours(0, 0, 0, 0);
    end.setDate(firstDay + 6);
    end.setHours(23, 59, 59, 999);
  } else if (filter === "last Week") {
    const firstDay = today.getDate() - today.getDay() - 7;
    start.setDate(firstDay);
    start.setHours(0, 0, 0, 0);
    end.setDate(firstDay + 6);
    end.setHours(23, 59, 59, 999);
  } else if (filter === "this Month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(today.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
}

export default function TransactionSummary() {
  const { transactions, balance, expenses, income } = useTransactions();
  const [filter, setFilter] = useState("thisMonth"); // default view
  

  // Filter transactions
  const { start, end } = getDateRange(filter);
  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= start && date <= end;
  });

//   // Totals
//   const income = filteredTransactions
//     .filter((t) => t.type === "income")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const expenses = filteredTransactions
//     .filter((t) => t.type === "expense")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const balance = income - expenses;

  // Pie Data
  const pieData = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
  ];

  // Line Data
  const lineData = filteredTransactions.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: t.amount
  }));

  return (
    <div className="p-4 space-y-6">
         {/* Filter Bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-md text-gray-900 font-semibold mb-2 first-letter:capitalize">
              {filter}&apos;s Analysis
            </h3>
            <div className="sort relative group">
              <button
                aria-label="Sort Options"
                type="button"
                className="flex items-center p-0.5 px-1 rounded-md hover:bg-gray-100 transition"
                >
                <IoIosMore size={30} className="text-gray-800 cursor-pointer" />
              </button>
              <ul className="absolute z-100 hidden group-hover:block right-4 top-5 bg-white shadow-lg rounded-lg  space-y-1">
                {sortList.map(({key, label}) => (
                  <li key={key} onClick={() => setFilter(key)} className="hover:bg-gray-100 p-3 px-4 text-nowrap">{label}</li>
                  
                ))}
              </ul>
            </div>
          </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 text-green-800 rounded-xl p-4 shadow">
          <p className="text-sm">Income</p>
          <p className="text-xl font-bold">${income.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl p-4 shadow">
          <p className="text-sm">Expenses</p>
          <p className="text-xl font-bold">${expenses.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-xl p-4 shadow">
          <p className="text-sm">Balance</p>
          <p className="text-xl font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-64 bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Income vs Expenses</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry,i) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="w-full h-64 bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Transactions Over Time</h2>
        <ResponsiveContainer>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" className="text-xs"/>
            <YAxis className="text-sm"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" />
            <Bar dataKey="income" fill="#00C49F" />
            <Bar dataKey="expense" fill="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
