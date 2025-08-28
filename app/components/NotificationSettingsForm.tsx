"use client";

import { useNotificationSettings } from "../hook/useNotificationSettings";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NotificationSettingsForm() {
  const { settings, updateSettings } = useNotificationSettings();

  const handleToggleReminders = () => {
    updateSettings({ ...settings, enableReminders: !settings.enableReminders });
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ ...settings, interval: e.target.value as any });
  };

  return (
    <div className="flex flex-col space-y-2.5 w-full">
      <div className="flex  items-center justify-between">
        <h2 className="font-semibold">Notification Settings</h2>
        <div className="flex space-x-2">
          <label className="">
            <input
              type="checkbox"
              checked={settings.enableReminders}
              onChange={handleToggleReminders}
              className="mr-1"
            />
            Enable Reminders
          </label>
        </div>
      </div>

      {settings.enableReminders && (
        <div className="w-full flex justify-between border-t rounded-2xl p-3 ">
          <label className="w-full flex justify-between" >
            <span>Reminder Interval:</span>
            <select
              value={settings.interval}
              onChange={handleIntervalChange}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="5min"> 5 mins.</option>
              <option value="15min"> 15 mins.</option>
              <option value="30min"> 30 mins.</option>
              <option value="1hr"> 1 hr</option>
              <option value="6hr"> 6 hrs</option>
              <option value="12hr"> 12 hrs</option>
              <option value="24hr"> 24 hrs</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
