import {
  Comment,
  Like,
  NotificationsQuery,
  NotificationType,
  PostMutatedSubscription,
  PostMutationType,
  Share,
} from 'generated/graphql';
import { ToastTypes } from 'types';
import { createNewNotification, removeActiveNotification } from 'utils/helpers/notifications-update';

export const updatePostSubscriptionQuery = (
  prevNotifications: NotificationsQuery['notifications'],
  newData: PostMutatedSubscription,
) => {
  const mutationType = newData.postMutated.mutation;
  const reaction = newData.postMutated.node;
  let toastContent;

  if (reaction) {
    switch (mutationType) {
      case PostMutationType.LikeCreated: {
        toastContent = {
          owner: {
            avatar: reaction.owner.avatar,
            firstName: reaction.owner.firstName,
            secondName: reaction.owner.secondName,
          },
          id: reaction.id,
          type: ToastTypes.PostLike,
        };

        return {
          toastContent,
          notifications: createNewNotification({
            currentNotifications: prevNotifications,
            newNotification: reaction as Like,
            notificationType: NotificationType.Like,
          }),
        };
      }
      case PostMutationType.LikeDeleted: {
        return {
          notifications: removeActiveNotification({
            notificationType: NotificationType.Like,
            id: reaction.id,
            currentNotifications: prevNotifications,
          }),
        };
      }
      case PostMutationType.ShareCreated: {
        toastContent = {
          owner: {
            avatar: reaction.owner.avatar,
            firstName: reaction.owner.firstName,
            secondName: reaction.owner.secondName,
          },
          id: reaction.id,
          type: ToastTypes.PostShare,
        };
        return {
          toastContent,
          notifications: createNewNotification({
            currentNotifications: prevNotifications,
            newNotification: reaction as Share,
            notificationType: NotificationType.Share,
          }),
        };
      }
      case PostMutationType.ShareDeleted: {
        return {
          notifications: removeActiveNotification({
            notificationType: NotificationType.Share,
            id: reaction.id,
            currentNotifications: prevNotifications,
          }),
        };
      }
      case PostMutationType.CommentCreated: {
        toastContent = {
          owner: {
            avatar: reaction.owner.avatar,
            firstName: reaction.owner.firstName,
            secondName: reaction.owner.secondName,
          },
          id: reaction.id,
          type: ToastTypes.PostComment,
        };
        return {
          toastContent,
          notifications: createNewNotification({
            currentNotifications: prevNotifications,
            newNotification: reaction as Comment,
            notificationType: NotificationType.Comment,
          }),
        };
      }
      case PostMutationType.CommentDeleted: {
        return {
          notifications: removeActiveNotification({
            notificationType: NotificationType.Comment,
            id: reaction.id,
            currentNotifications: prevNotifications,
          }),
        };
      }
      default: {
        return {
          notifications: prevNotifications,
        };
      }
    }
  } else {
    return {
      notifications: prevNotifications,
    };
  }
};
