"use client"

import { useEffect, useState } from "react"

export type IntervalOption = "5min" | "15min" | "30min" | "1hr" | "6hr" | "12hr" | "24hr"

interface NotificationSettings {
    enableReminders: boolean,
    interval: IntervalOption
}

const defaultSettings: NotificationSettings = {
    enableReminders: false,
    interval: "1hr" // default to 1 hour
}

export function useNotificationSettings() {
    const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)

    useEffect(() => {
        const storedSettings = localStorage.getItem("notificationSettings")
        if(storedSettings) {
            setSettings(JSON.parse(storedSettings))
        }
    }, [])

    const updateSettings = (newSettings: NotificationSettings) => {
        setSettings(newSettings)
        localStorage.setItem("notificationSettings", JSON.stringify(newSettings))
    }

    return { settings, updateSettings }
}