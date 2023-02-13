import { NotificationType, NotificationsQuery, Like, Share, Friendship, Comment } from 'generated/graphql';

export const createNewNotification = ({
  notificationType,
  currentNotifications,
  newNotification,
}: {
  notificationType: NotificationType;
  currentNotifications: NotificationsQuery['notifications'];
  newNotification: Like | Share | Friendship | Comment;
}) => {
  return currentNotifications.map((notification) => {
    if (notification?.type === notificationType) {
      return {
        ...notification,
        nodes: [newNotification, ...(notification.nodes ?? [])],
      };
    }
    return notification;
  });
};

export const removeActiveNotification = ({
  notificationType,
  id,
  currentNotifications,
}: {
  notificationType: NotificationType;
  id: number;
  currentNotifications: NotificationsQuery['notifications'];
}) => {
  return currentNotifications.map((item) => {
    if (item?.type === notificationType && item.nodes) {
      const updated = item.nodes.filter((node) => node?.id !== id);
      return {
        ...item,
        nodes: updated,
      };
    } else {
      return item;
    }
  });
};
