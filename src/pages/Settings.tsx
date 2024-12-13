import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../lib/store';
import { AlertCircle, CheckCircle, User, Globe, Lock, Bell, Moon, Sun, Layout } from 'lucide-react';
import { useTranslation } from '../lib/translations';

const settingsSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  language: z.string(),
  currentPassword: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
  confirmNewPassword: z.string().min(6).optional(),
  readerStyle: z.enum(['modern', 'classic']),
}).refine((data) => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
    return false;
  }
  return true;
}, {
  message: "New passwords must match and current password is required to change password",
  path: ["confirmNewPassword"],
});

type SettingsForm = z.infer<typeof settingsSchema>;

interface Alert {
  type: 'success' | 'error';
  message: string;
}

type SettingsTab = 'profile' | 'account' | 'notifications' | 'appearance';

export function Settings() {
  const { user, updateUser, updatePassword, theme, toggleTheme, updateReaderStyle } = useAuthStore();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const t = useTranslation(user?.language || 'en');
  
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      language: user?.language,
      readerStyle: user?.readerStyle || 'modern',
    }
  });

  const onSubmit = (data: SettingsForm) => {
    if (!user) return;

    let success = true;
    
    const profileSuccess = updateUser(user.id, {
      username: data.username,
      email: data.email,
      language: data.language as any,
      readerStyle: data.readerStyle,
    }, data.currentPassword);

    if (!profileSuccess) {
      setAlert({
        type: 'error',
        message: t('updateProfileError')
      });
      success = false;
    }

    if (data.newPassword && data.currentPassword) {
      const passwordSuccess = updatePassword(user.id, data.currentPassword, data.newPassword);
      if (!passwordSuccess) {
        setAlert({
          type: 'error',
          message: t('updatePasswordError')
        });
        success = false;
      }
    }

    if (success) {
      setAlert({
        type: 'success',
        message: t('settingsUpdated')
      });
    }
  };

  const tabs = [
    { id: 'profile' as const, label: t('profile'), icon: User },
    { id: 'account' as const, label: t('account'), icon: Lock },
    { id: 'notifications' as const, label: t('notifications'), icon: Bell },
    { id: 'appearance' as const, label: t('appearance'), icon: theme === 'dark' ? Sun : Moon },
  ];

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">{t('settings')}</h1>
        
        {alert && (
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
        )}

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {activeTab === 'profile' && (
            <>
              <div>
                <label className="block text-sm font-medium">{t('username')}</label>
                <input
                  {...register('username')}
                  type="text"
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">{t('language')}</label>
                <select
                  {...register('language')}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="en">English</option>
                  <option value="tr">Türkçe</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'account' && (
            <>
              <div>
                <label className="block text-sm font-medium">{t('email')}</label>
                <input
                  {...register('email')}
                  type="email"
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('changePassword')}</h3>
                <div>
                  <label className="block text-sm font-medium">{t('currentPassword')}</label>
                  <input
                    {...register('currentPassword')}
                    type="password"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.currentPassword.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">{t('newPassword')}</label>
                  <input
                    {...register('newPassword')}
                    type="password"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.newPassword.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">{t('confirmPassword')}</label>
                  <input
                    {...register('confirmNewPassword')}
                    type="password"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-gray-100'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.confirmNewPassword.message}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{t('emailNotifications')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('emailNotificationsDesc')}</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{t('chapterAlerts')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('chapterAlertsDesc')}</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{t('translationUpdates')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('translationUpdatesDesc')}</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{t('darkMode')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('darkModeDesc')}</p>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">{t('readerStyle')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer ${
                    user?.readerStyle === 'modern'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}>
                    <Layout className="h-8 w-8 mb-2" />
                    <input
                      type="radio"
                      {...register('readerStyle')}
                      value="modern"
                      className="sr-only"
                    />
                    <span>{t('modernReader')}</span>
                  </label>
                  <label className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer ${
                    user?.readerStyle === 'classic'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}>
                    <Layout className="h-8 w-8 mb-2" />
                    <input
                      type="radio"
                      {...register('readerStyle')}
                      value="classic"
                      className="sr-only"
                    />
                    <span>{t('classicReader')}</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'profile' || activeTab === 'account' || activeTab === 'appearance') && (
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('saveChanges')}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}