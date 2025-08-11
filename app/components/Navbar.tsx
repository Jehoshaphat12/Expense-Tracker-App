"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
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

  return (
    <div className="shadow-md bg-white mb-6">
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
          {navLink("/expenses/summary", "Summary")}
        </div>
      </div>
      {/* <nav className="max-w-xl mx-auto flex flex-col justify-center p-4  bg-white mb-6  gap-4">
        {navLink("/", "Home")}
        {navLink("/expenses/add", "+ Add")}
        {navLink("/expenses", "View Expenses")}
        {navLink("/expenses/summary", "Summary")}
      </nav> */}
    </div>
    //{" "}
  );
}
