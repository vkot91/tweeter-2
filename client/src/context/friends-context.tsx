import { createContext, useContext, useEffect, useMemo } from 'react';
import { useAuth } from './authed-user-context';
import {
  LastSeenUpdatedDocument,
  LastSeenUpdatedSubscription,
  LastSeenUpdatedSubscriptionVariables,
  RegularFriendshipFragment,
  useFriendshipsQuery,
  useUpdateUserMutation,
} from 'generated/graphql';
import moment from 'moment';

interface FriendsContextInterface {
  friendships: RegularFriendshipFragment[] | [];
  loading: boolean;
}

export const FriendsContext = createContext<FriendsContextInterface>({} as FriendsContextInterface);

export const FriendsProvider = ({ children }: { children: JSX.Element }) => {
  const { authedUser } = useAuth();
  const { data, subscribeToMore, loading } = useFriendshipsQuery({
    skip: !authedUser,
    variables: { userId: authedUser?.id as number },
  });
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    // Every 20s, run a mutation to tell the backend that you're online
    if (authedUser) {
      const interval = setInterval(() => {
        updateUser({
          variables: {
            updateUserInput: {
              lastSeen: moment() as unknown as string,
              id: authedUser!.id,
            },
          },
        });
      }, 1000 * 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [authedUser, updateUser, subscribeToMore]);

  useEffect(() => {
    if (authedUser) {
      const unsubscribe = subscribeToMore<LastSeenUpdatedSubscription, LastSeenUpdatedSubscriptionVariables>({
        document: LastSeenUpdatedDocument,
        variables: { userId: authedUser.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const updatedData = subscriptionData.data.lastSeenUpdated?.user;
          if (updatedData && prev.friendships) {
            const newFriendships = prev.friendships.map((friendship) => {
              if (friendship?.friend_id === updatedData.id) {
                return {
                  ...friendship,
                  friend: updatedData,
                  updated: true,
                };
              }
              return friendship;
            });
            return {
              friendships: newFriendships,
            };
          } else {
            return {
              friendships: prev.friendships,
            };
          }
        },
      });
      return () => unsubscribe();
    }
  }, [authedUser, subscribeToMore]);

  const value: FriendsContextInterface = useMemo(
    () => ({
      friendships: (data?.friendships as RegularFriendshipFragment[]) || [],
      loading: loading,
    }),
    [data, loading],
  );
  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

export const useFriends = () => {
  const friends = useContext(FriendsContext);
  return friends;
};
