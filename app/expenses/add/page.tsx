"use client";
import ExpenseList from "@/app/components/ExpenseList";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";
import { LuWallet } from "react-icons/lu";
import { useTransactions } from "@/app/hook/useTransactions";

export default function AddExpensePage() {
  const { transactions } = useTransactions();

  return (
    <div className="max-w-2xl mx-auto  bg-gray-100 rounded-2xl">
      <div className=" py-3 pb-0.5">
        <h2 className="text-2xl text-center font-semibold mb-0.5">Add </h2>
      </div>
      <section className="flex flex-col p-4">
        <div className="flex flex-col items-center sm:flex-row justify-center w-full space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
          <Link
            href={"/expenses/add/income"}
            className="w-[100%] sm:w-[40%] text-center font-semibold text-white p-4 py-6 bg-blue-600 rounded-2xl shadow-lg hover:-translate-y-0.5 transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <LuWallet size={30} />
            <span>Add Income</span>
          </Link>

          <Link
            href={"/expenses/add/expense"}
            className="w-[100%] sm:w-[40%] text-center font-semibold text-white p-4 py-6 bg-red-600 rounded-2xl shadow-lg hover:-translate-y-0.5 transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <LuWallet size={30} />
            <span>Add Expenses</span>
          </Link>
        </div>
      </section>

      <section className="bg-white p-6 px-5 rounded-4xl mt-6">
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
        <div className="overflow-auto h-[30rem]">
          <ExpenseList transactions={transactions} />
        </div>
      </section>
    </div>
  );
}
