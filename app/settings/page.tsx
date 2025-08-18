"use client";

import { useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { currencies } from "../components/CountryCodes";
import { BiMoon, BiSun } from "react-icons/bi";

export default function SettingPage() {
  const { currency, setCurrency } = useCurrency();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto py-4 px-5 space-y-6 pb-30 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      {/* Theme */}
      <div className="bg-white dark:bg-gray-800 py-2 px-4 rounded-2xl shadow flex items-center justify-between">
        <h2 className="text-lg font-semibold dark:text-gray-50">Theme</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-3 py-2 border dark:border-gray-600 dark:text-gray-50 rounded-lg"
        >
          {darkMode ? <BiMoon size={18} /> : <BiSun size={18} />}
          {darkMode ? "Dark" : "Light"}
        </button>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-3 dark:text-gray-50">
          Profile Settings
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full dark:bg-gray-900 border dark:border-gray-600 rounded-lg px-3 py-2 dark:text-gray-50"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full dark:bg-gray-900 border dark:border-gray-600 rounded-lg px-3 py-2 dark:text-gray-50"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Save Profile
          </button>
        </div>
      </div>
      {/* Currency Preference */}
      <div className="bg-white dark:bg-gray-800  p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-3 dark:text-gray-50">
          Currency Preference
        </h2>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full dark:bg-gray-900 border dark:border-gray-600 dark:text-gray-50 rounded-lg px-3 py-2"
        >
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.code} - {curr.name}
            </option>
          ))}
        </select>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex items-center justify-between">
        <h2 className="text-lg font-semibold dark:text-gray-50">
          Notifications
        </h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="dark:text-gray-50"
          />
          <span className="dark:text-gray-50">
            {notifications ? "Enabled" : "Disabled"}
          </span>
        </label>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-3">
        <h2 className="text-lg font-semibold mb-2 dark:text-gray-50">
          Data Management
        </h2>
        <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg">
          Clear All Transactions
        </button>
        <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg">
          Export Data
        </button>
      </div>
    </div>
  );
}
