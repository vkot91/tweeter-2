import { useCallback, useRef } from 'react';
import { ToastId, useToast } from '@chakra-ui/react';
import { FriendRequestToast } from 'components/Toasts/FriendRequest';
import { ToastTypes } from 'types';
import { useActiveNotification } from 'context/active-notification-context';
import { useNavigate } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';

interface Props {
  toastType: ToastTypes;
}

export const useCustomToast = ({ toastType }: Props) => {
  const { handleSetActiveNotificationId } = useActiveNotification();
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();
  const navigate = useNavigate();
  const closeToast = useCallback(() => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }, [toast]);

  const handleSetActiveNotification = useCallback(
    (id: number) => {
      closeToast();
      navigate(ROUTES_ENUM.NOTIFICATION);
      handleSetActiveNotificationId(id);
    },
    [closeToast, navigate, handleSetActiveNotificationId],
  );

  const addToast = useCallback(
    ({
      title,
      description,
      avatar,
      id,
    }: {
      title: string;
      description: string;
      avatar?: string | null;
      id: number;
    }) => {
      toastIdRef.current = toast({
        duration: 5000,
        id,
        variant: 'top-accent',
        position: 'top-right',
        render: () => {
          switch (toastType) {
            case ToastTypes.NewFriendRequest: {
              return (
                <FriendRequestToast
                  onTostClose={closeToast}
                  firstName={title}
                  secondName={description}
                  avatar={avatar || undefined}
                  id={id}
                  onClick={handleSetActiveNotification}
                />
              );
            }
          }
        },
      });
    },
    [closeToast, toast, toastType, handleSetActiveNotification],
  );

  return {
    addToast,
    closeToast,
  };
};
