"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { FaChartLine, FaList } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoClose, IoSettings } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md ${
        pathname === href
          ? "bg-blue-600 text-white"
          : "text-blue-600 hover:bg-blue-100"
      }`}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  );
  const mobileNav = (href: string, icon: React.ReactNode) => (
    <Link
      href={href}
      className={`p-3 rounded-full ${
        pathname === href ? "text-blue-700 bg-gray-100" : ""
      }`}
    >
      {icon}
    </Link>
  );

  return (
    <>
      <div className="hidden sm:block shadow-md bg-white mb-2">
        <div className="max-w-2xl mx-auto  flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Expense Tracker
          </Link>
          <button className=" text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoClose size={25} /> : <RiMenu2Fill size={25} />}
          </button>
        </div>
        <div
          className={`fixed bg-black/50 right-0 w-[100%] h-[100dvh] space-y-4  py-4 px-6 z-50 ${
            isOpen ? "flex" : "hidden"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`absolute right-0 top-0  ${
              isOpen ? "translate-x-[-0%]" : "translate-x-[100%]"
            } flex w-[80%] md:w-[50%] h-[100dvh] flex-col bg-white px-6 py-4 transition duration-500`}
          >
            {navLink("/", "Home")}
            {navLink("/expenses/add", "+ Add")}
            {navLink("/expenses", "View Expenses")}
            {navLink("/summary", "Summary")}
          </div>
        </div>
        {/* <nav className="max-w-xl mx-auto flex flex-col justify-center p-4  bg-white mb-6  gap-4">
        {navLink("/", "Home")}
        {navLink("/expenses/add", "+ Add")}
        {navLink("/expenses", "View Expenses")}
        {navLink("/expenses/summary", "Summary")}
        </nav> */}
      </div>

      {/* Mobile View Navbar */}
      <div className="sm:hidden fixed bottom-0 p-5 left-0 right-0 z-50  mx-4 bg-white border-t border-gray-400">
        <div className="flex space-x-3 items-center justify-between  text-gray-400">
          {mobileNav("/", <GoHomeFill size={22} />)}
          {mobileNav("/expenses", <FaList size={22} />)}
          <Link
            href={"/expenses/add"}
            className={`bg-blue-600 p-5 rounded-full text-white `}
          >
            <FiPlus size={30} />
          </Link>
          {mobileNav("/summary", <FaChartLine size={22} />)}
          {mobileNav("/settings", <IoSettings size={22} />)}
        </div>
      </div>
    </>
  );
}
