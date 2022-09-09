import {
  EarthIcon,
  GroupIcon,
  MenuIcon,
  MessagesIcon,
  NotificationIcon,
  ProfileIcon,
  SettingsIcon,
} from 'components/Icons';
import { ROUTES_ENUM } from './routes';

export const SIDEBAR_MENU_LINKS = [
  {
    title: 'Feed',
    icon: <MenuIcon />,
    route: ROUTES_ENUM.HOME,
  },
  {
    title: 'Community',
    icon: <GroupIcon />,
    route: ROUTES_ENUM.COMMUNITY,
  },
  {
    title: 'Messages',
    icon: <MessagesIcon />,
    route: ROUTES_ENUM.MESSAGES,
  },
  {
    title: 'Notifications',
    icon: <NotificationIcon />,
    route: ROUTES_ENUM.NOTIFICATION,
  },
  {
    title: 'Explore',
    icon: <EarthIcon />,
    route: ROUTES_ENUM.EXPLORE,
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    route: ROUTES_ENUM.PROFILE,
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    route: ROUTES_ENUM.SETTINGS,
  },
];
