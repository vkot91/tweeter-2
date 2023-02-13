import { createContext, useContext, useState } from 'react';

interface ActiveNotificationContextInterface {
  activeNotificationId: number | null;
  handleSetActiveNotificationId: (id: number | null) => void;
}

export const ActiveNotificationContext = createContext<ActiveNotificationContextInterface>(
  {} as ActiveNotificationContextInterface,
);

export const ActiveNotificationProvider = ({ children }: { children: JSX.Element }) => {
  const [activeNotificationId, setActiveNotificationId] = useState<number | null>(null);

  const handleSetActiveNotificationId = (id: number | null) => {
    setActiveNotificationId(id);
  };

  const value = {
    activeNotificationId,
    handleSetActiveNotificationId,
  };

  return <ActiveNotificationContext.Provider value={value}>{children}</ActiveNotificationContext.Provider>;
};

export const useActiveNotification = () => {
  const activeNotification = useContext(ActiveNotificationContext);
  return activeNotification;
};
