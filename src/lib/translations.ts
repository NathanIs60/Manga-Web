import { Language } from './store';

type TranslationKey = 
  | 'home'
  | 'browse'
  | 'latest'
  | 'popular'
  | 'login'
  | 'logout'
  | 'settings'
  | 'dashboard'
  | 'search'
  | 'profile'
  | 'account'
  | 'notifications'
  | 'appearance'
  | 'darkMode'
  | 'darkModeDesc'
  | 'username'
  | 'email'
  | 'password'
  | 'currentPassword'
  | 'newPassword'
  | 'confirmPassword'
  | 'saveChanges'
  | 'searchPlaceholder'
  | 'emailNotifications'
  | 'emailNotificationsDesc'
  | 'chapterAlerts'
  | 'chapterAlertsDesc'
  | 'translationUpdates'
  | 'translationUpdatesDesc'
  | 'changePassword'
  | 'updateProfileError'
  | 'updatePasswordError'
  | 'settingsUpdated'
  | 'readerStyle'
  | 'modernReader'
  | 'classicReader'
  | 'adminDashboard'
  | 'userManagement'
  | 'viewAllUsers'
  | 'bannedUsers'
  | 'contentManagement'
  | 'addNewManga'
  | 'translationStatus'
  | 'pendingReviews'
  | 'approved'
  | 'enterMangaTitle';

type Translations = {
  [key in TranslationKey]: string;
};

const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    browse: 'Browse',
    latest: 'Latest',
    popular: 'Popular',
    login: 'Login',
    logout: 'Logout',
    settings: 'Settings',
    dashboard: 'Dashboard',
    search: 'Search',
    profile: 'Profile',
    account: 'Account',
    notifications: 'Notifications',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Toggle between light and dark theme',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    saveChanges: 'Save Changes',
    searchPlaceholder: 'Search manga...',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive email updates about your account',
    chapterAlerts: 'New Chapter Alerts',
    chapterAlertsDesc: 'Get notified when new chapters are available',
    translationUpdates: 'Translation Updates',
    translationUpdatesDesc: 'Receive updates about manga translations',
    changePassword: 'Change Password',
    updateProfileError: 'Failed to update profile. Please check your current password or try a different email.',
    updatePasswordError: 'Failed to update password. Please check your current password.',
    settingsUpdated: 'Settings updated successfully!',
    readerStyle: 'Reader Style',
    modernReader: 'Modern',
    classicReader: 'Classic',
    adminDashboard: 'Admin Dashboard',
    userManagement: 'User Management',
    viewAllUsers: 'View All Users',
    bannedUsers: 'Banned Users',
    contentManagement: 'Content Management',
    addNewManga: 'Add New Manga',
    translationStatus: 'Translation Status',
    pendingReviews: 'Pending Reviews',
    approved: 'Approved',
    enterMangaTitle: 'Enter manga title:'
  },
  tr: {
    home: 'Ana Sayfa',
    browse: 'Göz At',
    latest: 'En Yeni',
    popular: 'Popüler',
    login: 'Giriş Yap',
    logout: 'Çıkış Yap',
    settings: 'Ayarlar',
    dashboard: 'Kontrol Paneli',
    search: 'Ara',
    profile: 'Profil',
    account: 'Hesap',
    notifications: 'Bildirimler',
    appearance: 'Görünüm',
    darkMode: 'Karanlık Mod',
    darkModeDesc: 'Açık ve karanlık tema arasında geçiş yap',
    username: 'Kullanıcı Adı',
    email: 'E-posta',
    password: 'Şifre',
    currentPassword: 'Mevcut Şifre',
    newPassword: 'Yeni Şifre',
    confirmPassword: 'Şifreyi Onayla',
    saveChanges: 'Değişiklikleri Kaydet',
    searchPlaceholder: 'Manga ara...',
    emailNotifications: 'E-posta Bildirimleri',
    emailNotificationsDesc: 'Hesabınızla ilgili e-posta güncellemeleri alın',
    chapterAlerts: 'Yeni Bölüm Uyarıları',
    chapterAlertsDesc: 'Yeni bölümler eklendiğinde bildirim alın',
    translationUpdates: 'Çeviri Güncellemeleri',
    translationUpdatesDesc: 'Manga çevirileri hakkında güncellemeler alın',
    changePassword: 'Şifre Değiştir',
    updateProfileError: 'Profil güncellenemedi. Lütfen mevcut şifrenizi kontrol edin veya farklı bir e-posta deneyin.',
    updatePasswordError: 'Şifre güncellenemedi. Lütfen mevcut şifrenizi kontrol edin.',
    settingsUpdated: 'Ayarlar başarıyla güncellendi!',
    readerStyle: 'Okuyucu Stili',
    modernReader: 'Modern',
    classicReader: 'Klasik',
    adminDashboard: 'Yönetici Paneli',
    userManagement: 'Kullanıcı Yönetimi',
    viewAllUsers: 'Tüm Kullanıcıları Görüntüle',
    bannedUsers: 'Yasaklı Kullanıcılar',
    contentManagement: 'İçerik Yönetimi',
    addNewManga: 'Yeni Manga Ekle',
    translationStatus: 'Çeviri Durumu',
    pendingReviews: 'Bekleyen İncelemeler',
    approved: 'Onaylandı',
    enterMangaTitle: 'Manga başlığını girin:'
  },
  // Add translations for other languages (es, fr, ja) similarly
  es: {
    // Spanish translations...
    home: 'Inicio',
    browse: 'Explorar',
    latest: 'Último',
    popular: 'Popular',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    settings: 'Configuración',
    dashboard: 'Panel',
    search: 'Buscar',
    profile: 'Perfil',
    account: 'Cuenta',
    notifications: 'Notificaciones',
    appearance: 'Apariencia',
    darkMode: 'Modo Oscuro',
    darkModeDesc: 'Cambiar entre tema claro y oscuro',
    username: 'Usuario',
    email: 'Correo',
    password: 'Contraseña',
    currentPassword: 'Contraseña Actual',
    newPassword: 'Nueva Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    saveChanges: 'Guardar Cambios',
    searchPlaceholder: 'Buscar manga...',
    emailNotifications: 'Notificaciones por Correo',
    emailNotificationsDesc: 'Recibir actualizaciones por correo sobre tu cuenta',
    chapterAlerts: 'Alertas de Nuevos Capítulos',
    chapterAlertsDesc: 'Recibir notificaciones cuando haya nuevos capítulos',
    translationUpdates: 'Actualizaciones de Traducción',
    translationUpdatesDesc: 'Recibir actualizaciones sobre traducciones de manga',
    changePassword: 'Cambiar Contraseña',
    updateProfileError: 'Error al actualizar el perfil. Por favor verifica tu contraseña actual o intenta con otro correo.',
    updatePasswordError: 'Error al actualizar la contraseña. Por favor verifica tu contraseña actual.',
    settingsUpdated: '¡Configuración actualizada exitosamente!',
    readerStyle: 'Estilo de Lectura',
    modernReader: 'Moderno',
    classicReader: 'Clásico',
    adminDashboard: 'Panel de Administración',
    userManagement: 'Gestión de Usuarios',
    viewAllUsers: 'Ver Todos los Usuarios',
    bannedUsers: 'Usuarios Bloqueados',
    contentManagement: 'Gestión de Contenido',
    addNewManga: 'Agregar Nuevo Manga',
    translationStatus: 'Estado de Traducción',
    pendingReviews: 'Revisiones Pendientes',
    approved: 'Aprobado',
    enterMangaTitle: 'Ingrese el título del manga:'
  },
  fr: {
    // French translations...
    home: 'Accueil',
    browse: 'Parcourir',
    latest: 'Nouveau',
    popular: 'Populaire',
    login: 'Connexion',
    logout: 'Déconnexion',
    settings: 'Paramètres',
    dashboard: 'Tableau de Bord',
    search: 'Rechercher',
    profile: 'Profil',
    account: 'Compte',
    notifications: 'Notifications',
    appearance: 'Apparence',
    darkMode: 'Mode Sombre',
    darkModeDesc: 'Basculer entre thème clair et sombre',
    username: 'Nom d\'utilisateur',
    email: 'Email',
    password: 'Mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    saveChanges: 'Enregistrer',
    searchPlaceholder: 'Rechercher un manga...',
    emailNotifications: 'Notifications par Email',
    emailNotificationsDesc: 'Recevoir des mises à jour par email sur votre compte',
    chapterAlerts: 'Alertes Nouveaux Chapitres',
    chapterAlertsDesc: 'Être notifié quand de nouveaux chapitres sont disponibles',
    translationUpdates: 'Mises à jour de Traduction',
    translationUpdatesDesc: 'Recevoir des mises à jour sur les traductions de manga',
    changePassword: 'Changer le mot de passe',
    updateProfileError: 'Échec de la mise à jour du profil. Veuillez vérifier votre mot de passe actuel ou essayer un autre email.',
    updatePasswordError: 'Échec de la mise à jour du mot de passe. Veuillez vérifier votre mot de passe actuel.',
    settingsUpdated: 'Paramètres mis à jour avec succès !',
    readerStyle: 'Style de Lecture',
    modernReader: 'Moderne',
    classicReader: 'Classique',
    adminDashboard: 'Tableau de Bord Admin',
    userManagement: 'Gestion des Utilisateurs',
    viewAllUsers: 'Voir Tous les Utilisateurs',
    bannedUsers: 'Utilisateurs Bannis',
    contentManagement: 'Gestion du Contenu',
    addNewManga: 'Ajouter un Nouveau Manga',
    translationStatus: 'État des Traductions',
    pendingReviews: 'Révisions en Attente',
    approved: 'Approuvé',
    enterMangaTitle: 'Entrez le titre du manga :'
  },
  ja: {
    // Japanese translations...
    home: 'ホーム',
    browse: '閲覧',
    latest: '最新',
    popular: '人気',
    login: 'ログイン',
    logout: 'ログアウト',
    settings: '設定',
    dashboard: 'ダッシュボード',
    search: '検索',
    profile: 'プロフィール',
    account: 'アカウント',
    notifications: '通知',
    appearance: '外観',
    darkMode: 'ダークモード',
    darkModeDesc: 'ライトテーマとダークテーマを切り替える',
    username: 'ユーザー名',
    email: 'メール',
    password: 'パスワード',
    currentPassword: '現在のパスワード',
    newPassword: '新しいパスワード',
    confirmPassword: 'パスワードの確認',
    saveChanges: '変更を保存',
    searchPlaceholder: 'マンガを検索...',
    emailNotifications: 'メール通知',
    emailNotificationsDesc: 'アカウントに関するメール更新を受け取る',
    chapterAlerts: '新規チャプター通知',
    chapterAlertsDesc: '新しいチャプターが利用可能になったときに通知を受け取る',
    translationUpdates: '翻訳更新',
    translationUpdatesDesc: 'マンガの翻訳に関する更新を受け取る',
    changePassword: 'パスワードの変更',
    updateProfileError: 'プロフィールの更新に失敗しました。現在のパスワードを確認するか、別のメールアドレスを試してください。',
    updatePasswordError: 'パスワードの更新に失敗しました。現在のパスワードを確認してください。',
    settingsUpdated: '設定が正常に更新されました！',
    readerStyle: 'リーダースタイル',
    modernReader: 'モダン',
    classicReader: 'クラシック',
    adminDashboard: '管理者ダッシュボード',
    userManagement: 'ユーザー管理',
    viewAllUsers: '全ユーザーを表示',
    bannedUsers: '禁止されたユーザー',
    contentManagement: 'コンテンツ管理',
    addNewManga: '新しいマンガを追加',
    translationStatus: '翻訳状況',
    pendingReviews: '保留中のレビュー',
    approved: '承認済み',
    enterMangaTitle: 'マンガのタイトルを入力：'
  }
};

export function useTranslation(language: Language = 'en') {
  return (key: TranslationKey): string => {
    return translations[language][key];
  };
}