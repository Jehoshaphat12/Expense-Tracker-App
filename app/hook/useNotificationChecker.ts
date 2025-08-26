"use client"

import { useEffect } from "react"
import toast from "react-hot-toast"

interface Reminder {
    id: number
    title: string
    date: string // ISO string
    time: string // "HH:MM"
}

interface Budget {
    id: number
    title: string
    limit: number
    startDate: string // ISO string
    endDate: string // ISO string
    spent: number
}

interface transaction {
    amount: number
    category: string
    title: string
    date: string

}

export function useNotificationChecker() {
    useEffect(() => {
        const checkNotifications = () => {
            try {
                const now = new Date()

                /** =====================
                * Reminders
                * ===================== */

                const reminders = JSON.parse(localStorage.getItem("reminders") || "[]") as Reminder[]

                reminders.forEach((reminder) => {
                    const dueDate = new Date(reminder.date)

                    // If overdue and not already notified
                    if(dueDate <= now && !localStorage.getItem(`notified-${reminder.id}`)) {
                        toast.error(`Reminder due: ${reminder.title}`, {
                            icon: '🔔',
                            duration: 4000,
                        })

                        // Mark this reminder as notified so it doesn't notify again
                        localStorage.setItem(`notified-${reminder.id}`, "true")
                    }
                })

                /** =====================
                * Budgets
                * ===================== */
                const budgets = JSON.parse(localStorage.getItem("budgets") || "[]") as Budget[]
                const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")

                budgets.forEach((budget) => {
                    const start = new Date(budget.startDate)
                    const end = new Date(budget.endDate)

                    // Filter transactions that fall within the budget period and Category (title match)
                    const budgetSpent = transactions
                        .filter((tx: transaction) => {
                            const date = new Date(tx.date)
                            return date >= start && date <= end && 
                            tx.category.toLowerCase().includes(budget.title.toLocaleLowerCase())
                        })
                        .reduce((sum: number, tx: transaction) => sum + Number(tx.amount), 0)

                        const remaining = budget.limit - budgetSpent

                    // // If spent exceeds limit and not already notified
                    // if(remaining < 0 && !localStorage.getItem(`budget-overspent-${budget.id}`)) {
                    //     toast.error(`Budget overspent: ${budget.title}`, {
                    //         icon: '⚠️',
                    //         duration: 4000,
                    //     })

                    //     // Mark this budget as notified so it doesn't notify again
                    //     localStorage.setItem(`budget-overspent-${budget.id}`, "true")
                    // }

                    // Overspent logic (repeat every hour)

                    if(remaining < 0 && now <= end) {
                        const lastNotified = localStorage.getItem(`budget-notified-${budget.id}`)
                        const lastTime = lastNotified ? new Date(lastNotified).getTime() : 0

                        // One hour interval between notifications
                        if(now.getTime() - lastTime > 3600000) {
                            toast.error(`Budget overspent: ${budget.title}`, {
                                icon: '⚠️',
                                duration: 5000,
                            })
                            localStorage.setItem(`budget-notified-${budget.id}`, now.toISOString())
                        }
                    }

                    // Budget ended Logic (repeat daily)
                    if(end <= now) {
                        const lastNotified = localStorage.getItem(`budget-ended-${budget.id}`)
                        const lastTime = lastNotified ? new Date(lastNotified).getTime() : 0

                        // One day interval between notifications
                        if(now.getTime() - lastTime > 86400000) {
                            toast(`Budget period ended: ${budget.title}. Spent: ${budgetSpent}, Limit: ${budget.limit}`, {
                                icon: 'ℹ️',
                                duration: 5000,
                            })
                            localStorage.setItem(`budget-ended-${budget.id}`, now.toISOString())
                        }
                    }
                })
                

            } catch (err) {
                console.error("Notification check error:", err)
            }
        }

        // Run immediately and then every minute
        checkNotifications()
        const interval = setInterval(checkNotifications, 60000)

        return () => clearInterval(interval)
    }, [])
}