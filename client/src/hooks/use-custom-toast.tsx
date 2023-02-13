import { useCallback, useRef } from 'react';
import { ToastId, useToast } from '@chakra-ui/react';
import { FriendRequestToast } from 'components/Toasts/FriendRequest';
import { ToastTypes } from 'types';
import { useActiveNotification } from 'context/active-notification-context';
import { useNavigate } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';
import { PostReactionToast } from 'components/Toasts/PostReaction';

export const useCustomToast = () => {
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
      owner,
      type,
      id,
    }: {
      owner: {
        avatar: string | null | undefined;
        firstName: string;
        secondName: string;
      };
      id: number;
      type: ToastTypes;
    }) => {
      toastIdRef.current = toast({
        duration: 5000,
        id,
        variant: 'top-accent',
        position: 'top-right',
        render: () => {
          switch (type) {
            case ToastTypes.FriendRequestAccepted:
            case ToastTypes.NewFriendRequest: {
              return (
                <FriendRequestToast
                  owner={owner}
                  type={type}
                  id={id}
                  onClick={handleSetActiveNotification}
                  onToastClose={closeToast}
                />
              );
            }

            case ToastTypes.PostComment:
            case ToastTypes.PostShare:
            case ToastTypes.PostLike: {
              return (
                <PostReactionToast
                  owner={owner}
                  type={type}
                  id={id}
                  onClick={handleSetActiveNotification}
                  onToastClose={closeToast}
                />
              );
            }
          }
        },
      });
    },
    [toast, handleSetActiveNotification, closeToast],
  );

  return {
    addToast,
    closeToast,
  };
};
