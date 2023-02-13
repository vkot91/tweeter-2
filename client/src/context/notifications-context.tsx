import { createContext, useContext, useEffect, useMemo } from 'react';
import {
  FriendshipMutatedDocument,
  FriendshipMutatedSubscription,
  FriendshipMutatedSubscriptionVariables,
  useNotificationsQuery,
  PostMutatedDocument,
  PostMutatedSubscription,
  PostMutatedSubscriptionVariables,
  Like,
  Friendship,
  Share,
  Comment,
} from 'generated/graphql';

import { useCustomToast } from 'hooks/use-custom-toast';
import { useAuth } from './authed-user-context';
import { formatDate } from 'utils/helpers';
import { updateFriendshipsSubscriptionQuery, updatePostSubscriptionQuery } from 'utils/graphql-subscriptions';

type FilterArgType = (Friendship | Like | Share | Comment)[];

interface NotificationsContextInterface {
  notifications?: Array<Friendship | Like | Share | Comment>;
  loading: boolean;
  count: number;
}

export const NotificationsContext = createContext<NotificationsContextInterface>({} as NotificationsContextInterface);

const filterByDate = (arr: FilterArgType) => {
  return [...arr]
    .sort((x, y) => {
      return new Date(x.updatedAt) < new Date(y.updatedAt) ? 1 : -1;
    })
    .map((item) => ({
      ...item,
      updatedAt: formatDate(item?.updatedAt),
    }));
};

export const NotificationsProvider = ({ children }: { children: JSX.Element }) => {
  const { authedUser } = useAuth();
  const { data, subscribeToMore, loading } = useNotificationsQuery({
    skip: !authedUser?.id,
  });

  const { addToast } = useCustomToast();

  useEffect(() => {
    if (authedUser?.id) {
      const friendsNotificationsSubscription = subscribeToMore<
        FriendshipMutatedSubscription,
        FriendshipMutatedSubscriptionVariables
      >({
        document: FriendshipMutatedDocument,
        variables: { userId: authedUser!.id },
        updateQuery: (prev, { subscriptionData }) => {
          const { notifications, toastContent } = updateFriendshipsSubscriptionQuery(
            prev.notifications,
            subscriptionData.data,
          );

          if (toastContent) {
            addToast({ ...toastContent });
          }

          return { notifications };
        },
      });

      const postMutatedSubscription = subscribeToMore<PostMutatedSubscription, PostMutatedSubscriptionVariables>({
        document: PostMutatedDocument,
        variables: { userId: authedUser!.id },
        updateQuery: (prev, { subscriptionData }) => {
          const { notifications, toastContent } = updatePostSubscriptionQuery(
            prev.notifications,
            subscriptionData.data,
          );

          if (toastContent) {
            addToast({ ...toastContent });
          }

          return { notifications };
        },
      });

      return () => {
        friendsNotificationsSubscription();
        postMutatedSubscription();
      };
    }
  }, [authedUser, subscribeToMore, addToast]);

  const allNotificationsNodes = data?.notifications.flatMap((item) => item?.nodes);

  const count = allNotificationsNodes?.length || 0;

  const combinedNotifications = useMemo(
    () => allNotificationsNodes && filterByDate(allNotificationsNodes as FilterArgType),

    [allNotificationsNodes],
  );

  const value: NotificationsContextInterface = useMemo(
    () => ({
      notifications: combinedNotifications,
      loading: loading,
      count,
    }),
    [combinedNotifications, loading, count],
  );
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => {
  const friends = useContext(NotificationsContext);
  return friends;
};
