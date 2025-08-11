"use client";

import { useTransactions } from "@/app/hook/useTransactions";
import React from "react";
import { LuWallet } from "react-icons/lu";
import ChangeCurrency from "./ChangeCurrency";
import { useCurrency } from "@/context/CurrencyContext";
import { currencies } from "./CountryCodes";

interface ExpenseBalanceProps {
  balance: number;
  income: number;
  expenses: number;
}

// const currencies = [
//   { code: "USD", symbol: "$" },
//   { code: "EUR", symbol: "€" },
//   { code: "GBP", symbol: "£" },
//   { code: "GHS", symbol: "₵" },
//   { code: "NGN", symbol: "₦" },
//   { code: "INR", symbol: "₹" },
//   { code: "JPY", symbol: "¥" },
//   { code: "CNY", symbol: "¥" },
//   { code: "AUD", symbol: "A$" },
//   { code: "CAD", symbol: "C$" },
//   { code: "ZAR", symbol: "R" },
//   { code: "BRL", symbol: "R$" },
//   { code: "RUB", symbol: "₽" },
//   { code: "KRW", symbol: "₩" },
//   { code: "MXN", symbol: "$" },
//   { code: "SGD", symbol: "S$" },
//   { code: "NZD", symbol: "NZ$" },
//   { code: "CHF", symbol: "CHF" },
//   { code: "AED", symbol: "د.إ" },
//   { code: "SAR", symbol: "ر.س" },
//   { code: "TRY", symbol: "₺" },
//   { code: "SEK", symbol: "kr" },
//   { code: "NOK", symbol: "kr" },
//   { code: "DKK", symbol: "kr" },
//   { code: "PLN", symbol: "zł" },
//   { code: "CZK", symbol: "Kč" },
//   { code: "HUF", symbol: "Ft" },
//   { code: "THB", symbol: "฿" },
//   { code: "IDR", symbol: "Rp" },
//   { code: "MYR", symbol: "RM" },
//   { code: "PHP", symbol: "₱" },
//   { code: "VND", symbol: "₫" },
//   { code: "TWD", symbol: "NT$" },
//   { code: "HKD", symbol: "HK$" },
//   { code: "ILS", symbol: "₪" },
//   { code: "CLP", symbol: "$" },
//   { code: "COP", symbol: "$" },
//   { code: "PEN", symbol: "S/" },
//   { code: "ARS", symbol: "$" },
//   { code: "UYU", symbol: "$" },
//   { code: "EGP", symbol: "ج.م" },
//   { code: "MAD", symbol: "د.م." },
//   { code: "KWD", symbol: "د.ك" },
//   { code: "QAR", symbol: "ر.ق" },
//   { code: "OMR", symbol: "ر.ع." },
//   { code: "BHD", symbol: "د.ب" },
//   { code: "JOD", symbol: "د.أ" },
//   { code: "LBP", symbol: "ل.ل" },
//   { code: "YER", symbol: "ر.ي" },
//   { code: "DZD", symbol: "د.ج" },
//   { code: "TND", symbol: "د.ت" },
//   { code: "SDG", symbol: "ج.س" },
//   { code: "SYP", symbol: "ل.س" },
//   { code: "BAM", symbol: "KM" },
//   { code: "MKD", symbol: "ден" },
//   { code: "RSD", symbol: "дин." },
//   { code: "BGN", symbol: "лв." },
//   { code: "HRK", symbol: "kn" },
//   { code: "RON", symbol: "lei" },
//   { code: "ISK", symbol: "kr" },
//   { code: "LTL", symbol: "Lt" },
//   { code: "LVL", symbol: "Ls" },
//   { code: "ETB", symbol: "Br" },
//   { code: "GEL", symbol: "₾" },
//   { code: "AZN", symbol: "₼" },
//   { code: "KZT", symbol: "₸" },
//   { code: "UZS", symbol: "лв" },
//   { code: "MNT", symbol: "₮" },
//   { code: "KHR", symbol: "៛" },
//   { code: "MMK", symbol: "K" },
//   { code: "LAK", symbol: "₭" },
//   { code: "AFN", symbol: "؋" },
//   { code: "NPR", symbol: "रु" },
// ];

const ExpenseBalance = ({ balance, income, expenses }: ExpenseBalanceProps) => {
  const { currency } = useCurrency();

  function formatAmount(amount: any, currency: any) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  function findCurrencySymbol(code: string) {
    for (const curr of currencies) {
      if (curr.code === code) {
        return curr.symbol;
      }
    }
  }

  return (
    <section className="flex flex-col p-4">
      <div className="flex flex-col space-y-1 bg-transparent p-4 rounded-2xl ">
        <div className="flex items-center justify-between">
          <h2 className="flex space-x-3 p-0 items-center text-white text-lg  font-md">
            <LuWallet /> <span>My Balance</span>
          </h2>
          <div>
            <ChangeCurrency />
          </div>
        </div>
        <p className="text-4xl text-white font-semibold mt-1">
          {/* {formatAmount(balance, currency)} ₵ */}{" "}
          {findCurrencySymbol(currency)}{" "}
          {balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full  space-x-3 mt-4">
        <div className="w-full text-center p-4 bg-white rounded-2xl shadow-lg hover:-translate-y-0.5 transition">
          <h2 className="flex space-x-3 items-center text-xs text-nowrap text-gray-500 sm:text-sm font-semibold">
            <LuWallet /> <span>Total Income</span>
          </h2>
          <p className=" text-blue-600 text-2xl font-semibold">
            {findCurrencySymbol(currency)}{" "}
            {income.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="w-full text-center p-4 bg-white rounded-2xl shadow-lg hover:-translate-y-0.5 transition">
          <h2 className="flex space-x-3 items-center text-xs text-nowrap text-gray-500 sm:text-sm font-semibold">
            <LuWallet /> <span>Total Expenses</span>
          </h2>
          <p className="text-red-600 text-2xl font-semibold">
            {findCurrencySymbol(currency)}{" "}
            {expenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpenseBalance;
