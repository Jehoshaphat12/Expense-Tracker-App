"use client";
import React from "react";
import Link from "next/link";
import { LuWallet } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";

import ExpenseList from "./components/ExpenseList";
import ExpenseBalance from "./components/ExpenseBalance";
import { useTransactions } from "@/app/hook/useTransactions";
import Filters from "./components/Filters";
// import Filters from "./components/Filters";

const HomePage = () => {
  const { filteredTransactions, balance, income, expenses } = useTransactions();

  return (
    <>
    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 py-4 px-4">
      <h1 className="font-semibold text-xl dark:text-gray-50">Welcome, Jay-O</h1>
      <div className="bg-gray-400 text-gray-200 px-3 py-1 rounded-full">
        <Link href={"/settings"} className="font-semibold">J</Link>
      </div>
    </div>
    <div className="max-w-xl mx-auto bg-blue-600 dark:bg-gray-950 rounded-4xl space-y-1 overflow-y-auto mt-1">
      <ExpenseBalance balance={balance} income={income} expenses={expenses} />

      <div className="relative overflow-y-auto p-7 px-3 bg-white dark:bg-gray-800 rounded-t-4xl h-full">
        <section className="flex flex-col dark:text-gray-50 space-x-3 w-full items-center justify-center mt-3  mb-6 px-5">
          <div className="flex items-center justify-center space-x-2 w-full mb-4">
            <Link
              aria-label="Add Savings"
              href="/savings-reminder-budget/savings"
              className="bg-blue-600 w-full flex items-center justify-center space-x-2 px-4 py-3 shadow-lg rounded-3xl hover:-translate-y-0.5 transition cursor-pointer"
              >
              <span className="hidden sm:inline-block bg-blue-500 rounded-lg p-1 text-white">
                <BiPlus size={20} />
              </span>
              <span className="text-white text-xs sm:text-sm ">Savings</span>
            </Link>
            <Link
              aria-label="Set Reminder"
              href="/savings-reminder-budget/reminder"
              className="dark:text-gray-50 dark:bg-gray-800 dark:border-gray-500 flex w-full items-center justify-center space-x-2 px-4 py-3 shadow-lg rounded-3xl hover:-translate-y-0.5 transition cursor-pointer"
              >
              <span className="hidden sm:inline-block bg-gray-100 rounded-lg p-1 text-gray-600">
                <FaRegBell size={20} />
              </span>
              <span className="text-sm">Remind</span>
            </Link>
            <Link
              aria-label="Set Budget"
              href="/savings-reminder-budget/budget"
              className="dark:text-gray-50 dark:bg-gray-800 dark:border-gray-500 flex w-full items-center justify-center space-x-2 px-4 py-3 shadow-lg rounded-3xl hover:-translate-y-0.5 transition cursor-pointer"
              >
              <span className="hidden sm:inline-block bg-gray-100 rounded-lg p-1 text-gray-600">
                <LuWallet size={20} />
              </span>
              <span className="text-sm">Budget</span>
            </Link>
          </div>
          <div></div>
        </section>

        <Link
          href="/expenses/add"
          className="hidden sm:block absolute bottom-6 right-4  z-10"
          >
          <button
            aria-label="Add Expense"
            type="button"
            className="w-full bg-blue-600 text-white text-2xl py-2 px-3 rounded-full hover:bg-blue-700 hover:scale-110 transition duration-300 cursor-pointer"
            >
            <BiPlus size={25} className="inline-block " />
          </button>
        </Link>
        

        <section className="h-[50dvh]">
          
          <ExpenseList transactions={filteredTransactions} />
        </section>
      </div>
    </div>
            </>
  );
};

export default HomePage;
