"use client";
import { useCurrency } from "@/context/CurrencyContext";
import { currencies } from "../components/CountryCodes";
import ExpenseList from "../components/ExpenseList";
import { useTransactions } from "../hook/useTransactions";
import Link from "next/link";

export default function IncomePage() {
  const { transactions, expenses } = useTransactions();
  const { currency } = useCurrency();

  const expenseTransactions = transactions.filter((t) => t.amount < 0);

  function findCurrencySymbol(code: string) {
    for (const curr of currencies) {
      if (curr.code === code) {
        return curr.symbol;
      }
    }
  }
  return (
    <div className="dark:bg-gray-800 dark:text-gray-50 py-4">
      <div className="flex justify-center w-full py-4">
      <Link href={"/income"} className="w-full flex justify-center text-md font-semibold text-center hover:text-blue-400"> Income Trans.</Link>
      <h2 className="w-full text-blue-500 text-md font-semibold text-center">
        Expense Trans.
      </h2>
      </div>

      <div className="w-full text-black flex items-center justify-center space-x-5">
       <p className="font-semibold text-sm text-gray-400">Total Expense:</p>
        <h2 className="text-sm font-semibold text-right text-gray-400">
          {findCurrencySymbol(currency)}{" "}
          {expenses.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
      </div>
      <div className="h-[80dvh] flex flex-col overflow-y-auto overflow-x-hidden md:p-4">
        <ExpenseList transactions={expenseTransactions} />
      </div>
    </div>
  );
}
