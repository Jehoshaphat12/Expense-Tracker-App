"use client";
import React from "react";
import Link from "next/link";
import { LuWallet } from "react-icons/lu";
import { FaBell, FaPlus, FaRegBell } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { FiEdit, FiMoreHorizontal } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { IoFastFoodOutline, IoGiftOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineSpeakerPhone } from "react-icons/md";

import ExpenseList from "../components/ExpenseList";
import ExpenseBalance from "../components/ExpenseBalance";
import { useTransactions } from "@/app/hook/useTransactions";

const HomePage = () => {
  const { transactions, balance, income, expenses } = useTransactions();
  // const formatCurrency = (amount: number) => {
  //   new Intl.NumberFormat("en-GH", {
  //     style: "currency",
  //     currency: "GHS",
  //   }).format(amount);
  // };

  return (
    <main className=" max-w-xl mx-auto bg-gray-100 space-y-6">
      <header className="text-center w-full bg-white">
        <h1 className="text-2xl font-semibold">My Expense Tracker</h1>
        <p className="text-gray-500">Track your spending. Stay in control.</p>
      </header>

      <ExpenseBalance balance={balance} income={income} expenses={expenses} />

      <div className="relative overflow-hidden p-7 bg-white rounded-t-4xl h-[30rem]">
        <section className="flex flex-col space-x-3 w-full items-center justify-center mt-3  mb-6">
          <div className="flex items-center justify-center space-x-3 w-full mb-4">
            <button
              aria-label="Add Savings"
              type="button"
              className="bg-blue-600 flex items-center justify-center space-x-2 px-4 py-3 shadow-lg rounded-3xl hover:-translate-y-0.5 transition cursor-pointer"
            >
              <span className="bg-blue-500 rounded-lg p-1 text-white">
                <BiPlus size={20} />
              </span>
              <span className="text-white text-sm">Savings</span>
            </button>
            <button
              aria-label="Set Reminder"
              type="button"
              className="flex items-center justify-center space-x-2 px-4 py-3 shadow-lg rounded-3xl hover:-translate-y-0.5 transition cursor-pointer"
            >
              <span className="bg-gray-100 rounded-lg p-1 text-gray-600">
                <FaRegBell size={20} />
              </span>
              <span className="text-sm">Remind</span>
            </button>
            <button
              aria-label="Set Budget"
              type="button"
              className="flex items-center justify-center space-x-2 px-4 py-3 shadow-lg rounded-3xl hover:-translate-y-0.5 transition cursor-pointer"
            >
              <span className="bg-gray-100 rounded-lg p-1 text-gray-600">
                <LuWallet size={20} />
              </span>
              <span className="text-sm">Budget</span>
            </button>
          </div>
          <div></div>
        </section>

        <Link href="/expenses/add" className="absolute bottom-6 right-4  z-10">
          <button
            aria-label="Add Expense"
            type="button"
            className="w-full bg-blue-600 text-white text-2xl py-2 px-3 rounded-full hover:bg-blue-700 hover:scale-110 transition duration-300 cursor-pointer"
          >
            <BiPlus size={25} className="inline-block " />
          </button>
        </Link>

        <section>
          <div className="flex items-center justify-between mb-4 px-4">
            <h3 className="text-md font-semibold mb-2">Latest Entries</h3>
            <div className="sort relative group">
              <button
                aria-label="Sort Options"
                type="button"
                className="flex items-center p-0.5 px-1 rounded-md hover:bg-gray-100 transition"
              >
                <IoIosMore size={30} className="text-gray-800 cursor-pointer" />
              </button>
              <ul className="absolute hidden group-hover:block right-4 top-5 bg-white shadow-lg rounded-lg  space-y-1">
                <li className="hover:bg-gray-100 p-3 px-4">Today</li>
                <li className="hover:bg-gray-100 p-3 px-4">Yesterday</li>
                <li className="hover:bg-gray-100 p-3 px-4">
                  <Link href={"/expenses"}>More...</Link>
                </li>
              </ul>
            </div>
          </div>
          <ExpenseList transactions={transactions} />
        </section>
      </div>
    </main>
  );
};

export default HomePage;
