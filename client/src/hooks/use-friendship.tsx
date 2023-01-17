import { Button, ButtonGroup, Text, useToast, VStack } from '@chakra-ui/react';
import { PersonAddIcon, PersonDeleteIcon } from 'components/Icons';
import { useAuth } from 'context/authed-user-context';
import {
  Friendship,
  FriendshipsDocument,
  FriendsRequestsDocument,
  Status,
  useCreateFriendshipMutation,
  useRemoveFriendshipMutation,
  useUpdateCreatorMutation,
  useUpdateStatusMutation,
} from 'generated/graphql';
import { formatDate } from 'utils/helpers';

interface Props {
  isOwnerPage?: boolean;
  friendship?: Friendship;
  profileId?: number;
}

export const useFriendship = ({ friendship, isOwnerPage, profileId }: Props) => {
  const [addFriend, { loading: addFriendLoading }] = useCreateFriendshipMutation();
  const [removeFriend, { loading: removeFriendLoading }] = useRemoveFriendshipMutation();
  const [updateFriendshipStatus, { loading: updateFriendshipStatusLoading }] = useUpdateStatusMutation();
  const [updateCreator, { loading: updateCreatorLoading }] = useUpdateCreatorMutation();

  const toast = useToast({ position: 'top-right', isClosable: true, duration: 2000 });

  const { authedUser } = useAuth();

  let content: JSX.Element = <></>;

  const handleAddFriend = async (id: number) => {
    await addFriend({
      variables: {
        createFriendshipInput: {
          friend_id: id,
        },
      },
      refetchQueries: [FriendshipsDocument],
      onCompleted: () => {
        toast({
          title: 'Request for adding friend was send',
          status: 'success',
        });
      },
    });
  };

  const handleRemoveFriend = async () => {
    if (friendship && friendship.id) {
      await removeFriend({
        variables: {
          removeFriendshipId: friendship.id,
        },
        refetchQueries: [FriendshipsDocument],
      });
    }
  };

  const handleUpdateFriendshipStatus = ({
    status,
    friendshipId = friendship!.id as number,
    refetchUser,
  }: {
    status: Status;
    friendshipId?: number;
    refetchUser: boolean;
  }) => {
    if (friendshipId) {
      updateFriendshipStatus({
        variables: {
          updateStatusInput: {
            id: friendshipId,
            status,
          },
        },
        refetchQueries: [FriendsRequestsDocument, ...(refetchUser ? [FriendshipsDocument] : [])],
      });
    }
  };

  const handleUpdateCreator = async (id: number) => {
    await updateCreator({
      variables: {
        friendshipId: id,
      },
      refetchQueries: [FriendshipsDocument],
      onCompleted: () => {
        toast({
          title: 'Request for adding friend was send',
          status: 'success',
        });
      },
    });
  };

  const isNoFriendship = !friendship && !isOwnerPage;

  const isActiveProfileUserSendFriendRequest =
    friendship && !friendship.requestCreator && friendship.status === Status.Pending;

  const isAuthedUserSendFriendRequest = friendship && friendship.requestCreator && friendship.status === Status.Pending;

  const isFriendshipAccepted = friendship && friendship.status === Status.Confirmed;

  const isFriendshipRejected = friendship && friendship.status === Status.Rejected;

  const isFriendshipBlocked =
    friendship && friendship.friend_id === authedUser!.id && friendship.status === Status.Blocked;

  if (isFriendshipBlocked) {
    content = (
      <VStack>
        <Button mb={3} leftIcon={<PersonAddIcon />} disabled>
          Add friend
        </Button>
        <Text fontSize='xs' maxW='200' variant='secondary'>
          You reached the count of attempts to add user to the friend&apos;s list
        </Text>
      </VStack>
    );
  }

  if (isNoFriendship && profileId) {
    content = (
      <Button leftIcon={<PersonAddIcon />} onClick={() => handleAddFriend(profileId)} isLoading={addFriendLoading}>
        Add friend
      </Button>
    );
  }

  if (isFriendshipBlocked && friendship && friendship.id) {
    //updateCreator friendship.id
    content = (
      <Button
        leftIcon={<PersonAddIcon />}
        onClick={() => handleUpdateCreator(friendship.id as number)}
        isLoading={updateCreatorLoading}
      >
        Add friend
      </Button>
    );
  }

  if (isActiveProfileUserSendFriendRequest) {
    content = (
      <ButtonGroup w={250}>
        <Button
          width='full'
          variant='solid'
          colorScheme='whatsapp'
          isLoading={updateFriendshipStatusLoading}
          onClick={() =>
            handleUpdateFriendshipStatus({
              status: Status.Confirmed,
              refetchUser: true,
            })
          }
        >
          Accept
        </Button>
        <Button
          variant='outline'
          colorScheme='gray'
          width='full'
          isLoading={updateFriendshipStatusLoading}
          onClick={() =>
            handleUpdateFriendshipStatus({
              status: Status.Rejected,
              refetchUser: true,
            })
          }
        >
          Decline
        </Button>
      </ButtonGroup>
    );
  }

  if (isAuthedUserSendFriendRequest) {
    content = (
      <Button leftIcon={<PersonDeleteIcon />} onClick={handleRemoveFriend} isLoading={removeFriendLoading}>
        Remove friend request
      </Button>
    );
  }

  if (isFriendshipAccepted) {
    content = (
      <ButtonGroup>
        <Button variant='solid' colorScheme='whatsapp'>
          Send a message
        </Button>
        <Button
          leftIcon={<PersonDeleteIcon />}
          onClick={handleRemoveFriend}
          isLoading={removeFriendLoading}
          variant='outline'
          colorScheme='gray'
        >
          Remove friend
        </Button>
      </ButtonGroup>
    );
  }

  if (isFriendshipRejected) {
    content = (
      <VStack>
        <Text fontSize='xs'>Declined your request {formatDate(friendship.updatedAt as string)}</Text>
        <Button
          leftIcon={<PersonAddIcon />}
          onClick={() =>
            handleUpdateFriendshipStatus({
              status: Status.Pending,
              refetchUser: true,
            })
          }
          isLoading={updateFriendshipStatusLoading}
          colorScheme='blue'
        >
          Send request again
        </Button>
      </VStack>
    );
  }

  return {
    handleAddFriend,
    handleRemoveFriend,
    handleUpdateFriendshipStatus,
    // isFriendshipAccepted,
    // isAuthedUserSendFriendRequest,
    // isFriendshipRejected,
    // isActiveProfileUserSendFriendRequest,
    addFriendLoading,
    removeFriendLoading,
    updateFriendshipStatusLoading,
    content,
  };
};
