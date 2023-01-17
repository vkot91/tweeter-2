import { AuthPage } from 'pages/Auth';
import { HomePage } from 'pages/Home';
import { NotificationsPage } from 'pages/Notifications';
import { ProfilePage } from 'pages/Profile';

export enum ROUTES_ENUM {
  LOGIN = '/login',
  REGISTER = '/register',
  REGISTER_SUCCESS = '/register/success',
  CONFIRM = '/confirm',
  FORGOT_PASSWORD = '/forgot-password',
  RESTORE = '/restore',
  HOME = '/home',
  COMMUNITY = '/community',
  MESSAGES = '/messages',
  NOTIFICATION = '/notifications',
  EXPLORE = '/explore',
  PROFILE = '/profile/:username',
  SETTINGS = '/settings',
  LOGOUT = '/logout',
}

interface Route {
  element: JSX.Element;
  paths: ROUTES_ENUM[];
}
export const publicRoutes: Route = {
  element: <AuthPage />,
  paths: [
    ROUTES_ENUM.LOGIN,
    ROUTES_ENUM.REGISTER,
    ROUTES_ENUM.CONFIRM,
    ROUTES_ENUM.FORGOT_PASSWORD,
    ROUTES_ENUM.REGISTER_SUCCESS,
    ROUTES_ENUM.RESTORE,
  ],
};

export const privateRoutes = [
  {
    path: ROUTES_ENUM.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES_ENUM.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: ROUTES_ENUM.NOTIFICATION,
    element: <NotificationsPage />,
  },
];
