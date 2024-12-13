import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface Alert {
  type: 'success' | 'error';
  message: string;
}

interface SettingsAlertProps {
  alert: Alert | null;
}

export function SettingsAlert({ alert }: SettingsAlertProps) {
  if (!alert) return null;

  return (
    <div className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
      alert.type === 'success' 
        ? 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-100' 
        : 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-100'
    }`}>
      {alert.type === 'success' ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      {alert.message}
    </div>
  );
}