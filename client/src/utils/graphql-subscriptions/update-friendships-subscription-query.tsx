import {
  FriendshipMutatedSubscription,
  FriendshipMutationType,
  NotificationsQuery,
  NotificationType,
} from 'generated/graphql';
import { ToastTypes } from 'types';
import { createNewNotification, removeActiveNotification } from 'utils/helpers/notifications-update';

export const updateFriendshipsSubscriptionQuery = (
  prevNotifications: NotificationsQuery['notifications'],
  newData: FriendshipMutatedSubscription,
) => {
  const mutationType = newData.friendshipMutated?.mutation;
  const newRequest = newData.friendshipMutated?.node;

  let toastContent;

  if (newRequest && newRequest.id) {
    switch (mutationType) {
      case FriendshipMutationType.Created: {
        const { requestCreatorInfo } = newRequest;
        if (requestCreatorInfo?.firstName && requestCreatorInfo?.secondName) {
          const { firstName, secondName, avatar } = requestCreatorInfo;
          toastContent = {
            owner: {
              avatar,
              firstName,
              secondName,
            },
            id: newRequest.id,
            type: ToastTypes.NewFriendRequest,
          };
        }

        const friendsRequestsNotifications = prevNotifications.map((item) => {
          const { requestCreatorInfo } = newRequest;
          Object.assign(newRequest.friend, requestCreatorInfo);
          return item;
        });

        return {
          toastContent,
          notifications: createNewNotification({
            currentNotifications: friendsRequestsNotifications,
            notificationType: NotificationType.Friendship,
            newNotification: newRequest,
          }),
        };
      }
      case FriendshipMutationType.Deleted: {
        return {
          toastContent,
          notifications: removeActiveNotification({
            notificationType: NotificationType.Friendship,
            id: newRequest.id,
            currentNotifications: prevNotifications,
          }),
        };
      }
      case FriendshipMutationType.Updated: {
        const { firstName, secondName, avatar } = newRequest.friend;
        toastContent = {
          owner: {
            avatar,
            firstName,
            secondName,
          },
          id: newRequest.id,
          type: ToastTypes.FriendRequestAccepted,
        };

        return {
          toastContent,
          notifications: prevNotifications,
        };
      }
      default: {
        return {
          toastContent,
          notifications: prevNotifications,
        };
      }
    }
  } else {
    return {
      toastContent,
      notifications: prevNotifications,
    };
  }
};
