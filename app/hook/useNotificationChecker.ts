"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNotificationSettings } from "./useNotificationSettings";

interface Reminder {
  id: number;
  title: string;
  date: string; // ISO string
  time: string; // "HH:MM"
}

interface Budget {
  id: number;
  title: string;
  limit: number;
  startDate: string; // ISO string
  endDate: string; // ISO string
  spent: number;
}

interface Transaction {
  amount: number;
  category: string;
  title: string;
  date: string;
}

function getIntervalMs(interval: string) {
  switch (interval) {
    case "5min":
      return 5 * 60 * 1000;
    case "15min":
      return 15 * 60 * 1000;
    case "30min":
      return 30 * 60 * 1000;
    case "1hr":
      return 60 * 60 * 1000;
    case "6hr":
      return 6 * 60 * 60 * 1000;
    case "12hr":
      return 12 * 60 * 60 * 1000;
    case "24hr":
      return 24 * 60 * 60 * 1000;
    default:
      return 60 * 60 * 1000;
  }
}

export function useNotificationChecker() {
  const { settings } = useNotificationSettings();

  useEffect(() => {
    const checkNotifications = () => {
      try {
        const now = new Date();

        /** =====================
         * Reminders
         * ===================== */
        const reminders = JSON.parse(
          localStorage.getItem("reminders") || "[]"
        ) as Reminder[];

        reminders.forEach((reminder) => {
          const dueDate = new Date(reminder.date);

          // If overdue
          if (dueDate <= now) {
            const lastNotified = localStorage.getItem(
              `reminder-last-${reminder.id}`
            );
            const lastTime = lastNotified
              ? new Date(lastNotified).getTime()
              : 0;

            // Only remind again if interval has passed
            if (now.getTime() - lastTime >= getIntervalMs(settings.interval)) {
              toast.error(`Reminder due: ${reminder.title}`, {
                icon: "🔔",
                duration: 5000,
              });

              localStorage.setItem(
                `reminder-last-${reminder.id}`,
                now.toISOString()
              );
            }
          }
        });

        /** =====================
         * Budgets
         * ===================== */
        const budgets = JSON.parse(
          localStorage.getItem("budgets") || "[]"
        ) as Budget[];
        const transactions = JSON.parse(
          localStorage.getItem("transactions") || "[]"
        ) as Transaction[];

        budgets.forEach((budget) => {
          const start = new Date(budget.startDate);
          const end = new Date(budget.endDate);

          const budgetSpent = transactions
            .filter((tx) => {
              const date = new Date(tx.date);
              return (
                date >= start &&
                date <= end &&
                tx.category.toLowerCase().includes(budget.title.toLowerCase())
              );
            })
            .reduce((sum, tx) => sum + Number(tx.amount), 0);

          const remaining = budget.limit - budgetSpent;

          // Overspent logic (repeat every hour)
          if (remaining < 0 && now <= end) {
            const lastNotified = localStorage.getItem(
              `budget-notified-${budget.id}`
            );
            const lastTime = lastNotified
              ? new Date(lastNotified).getTime()
              : 0;

            if (now.getTime() - lastTime > 3600000) {
              toast.error(`Budget overspent: ${budget.title}`, {
                icon: "⚠️",
                duration: 5000,
              });
              localStorage.setItem(
                `budget-notified-${budget.id}`,
                now.toISOString()
              );
            }
          }

          // Budget ended logic (repeat daily)
          if (end <= now) {
            const lastNotified = localStorage.getItem(
              `budget-ended-${budget.id}`
            );
            const lastTime = lastNotified
              ? new Date(lastNotified).getTime()
              : 0;

            if (now.getTime() - lastTime > 86400000) {
              toast(
                `Budget period ended: ${budget.title}. Spent: ${budgetSpent}, Limit: ${budget.limit}`,
                {
                  icon: "ℹ️",
                  duration: 5000,
                }
              );
              localStorage.setItem(
                `budget-ended-${budget.id}`,
                now.toISOString()
              );
            }
          }
        });
      } catch (err) {
        console.error("Notification check error:", err);
      }
    };

    // Run immediately and then every X minutes based on settings
    checkNotifications();

    if (settings.enableReminders) {
      const interval = setInterval(
        checkNotifications,
        getIntervalMs(settings.interval)
      );
      return () => clearInterval(interval);
    }
  }, [settings]);
}
