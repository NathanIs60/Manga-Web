import React from 'react';
import { User, Lock, Bell, Moon, Sun } from 'lucide-react';
import { Theme } from '../../lib/store';

export type SettingsTab = 'profile' | 'account' | 'notifications' | 'appearance';

interface SettingsTabsProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
  theme: Theme;
}

export function SettingsTabs({ activeTab, setActiveTab, theme }: SettingsTabsProps) {
  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'account' as const, label: 'Account', icon: Lock },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'appearance' as const, label: 'Appearance', icon: theme === 'dark' ? Sun : Moon },
  ];

  return (
    <div className="flex space-x-1 border-b mb-6 dark:border-gray-700">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === id
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}