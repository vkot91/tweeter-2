import { createContext, useContext, useEffect, useMemo } from 'react';
import {
  FriendshipMutatedDocument,
  FriendshipMutatedSubscription,
  FriendshipMutatedSubscriptionVariables,
  FriendsRequestsQuery,
  MutationType,
  useFriendsRequestsQuery,
} from 'generated/graphql';
import { useCustomToast } from 'hooks/use-custom-toast';
import { ToastTypes } from 'types';
import { useAuth } from './authed-user-context';

interface FriendsRequestsContextInterface {
  friendsRequests: FriendsRequestsQuery['friendsRequests'];
  loading: boolean;
}

export const FriendsRequestsContext = createContext<FriendsRequestsContextInterface>(
  {} as FriendsRequestsContextInterface,
);

export const FriendsRequestsProvider = ({ children }: { children: JSX.Element }) => {
  const { authedUser } = useAuth();
  const { data, subscribeToMore, loading } = useFriendsRequestsQuery({
    skip: !authedUser?.id,
  });
  const { addToast } = useCustomToast({ toastType: ToastTypes.NewFriendRequest });

  useEffect(() => {
    if (authedUser?.id) {
      const unsubscribe = subscribeToMore<FriendshipMutatedSubscription, FriendshipMutatedSubscriptionVariables>({
        document: FriendshipMutatedDocument,
        variables: { userId: authedUser!.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const mutationType = subscriptionData.data.friendshipMutated?.mutation;
          const newRequest = subscriptionData.data.friendshipMutated?.node;
          if (newRequest && newRequest.id) {
            switch (mutationType) {
              case MutationType.Created: {
                const { friend } = newRequest;
                if (friend?.firstName && friend?.secondName) {
                  const { firstName, secondName, avatar } = friend;
                  addToast({
                    avatar,
                    title: firstName,
                    description: secondName,
                    id: newRequest.id,
                  });
                }
                return {
                  friendsRequests: [...prev.friendsRequests, newRequest],
                };
              }
              case MutationType.Deleted: {
                const friendsRequests = prev.friendsRequests.filter(
                  (request) => request?.id !== subscriptionData.data.friendshipMutated?.node.id,
                );
                return {
                  friendsRequests,
                };
              }
              default: {
                return {
                  friendsRequests: [],
                };
              }
            }
          } else {
            return {
              friendsRequests: [...prev.friendsRequests],
            };
          }
        },
      });
      return () => unsubscribe();
    }
  }, [authedUser, subscribeToMore, addToast]);

  const value: FriendsRequestsContextInterface = useMemo(
    () => ({
      friendsRequests: data?.friendsRequests || [],
      loading: loading,
    }),
    [data, loading],
  );
  return <FriendsRequestsContext.Provider value={value}>{children}</FriendsRequestsContext.Provider>;
};

export const useFriendsRequests = () => {
  const friends = useContext(FriendsRequestsContext);
  return friends;
};
