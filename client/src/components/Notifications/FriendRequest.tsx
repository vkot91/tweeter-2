import { ButtonGroup, Button } from '@chakra-ui/react';

import { useFriendship } from 'hooks/use-friendship';
import { Friendship, NotificationType, Status } from 'generated/graphql';
import { useActiveNotification } from 'context/active-notification-context';
import { NotificationContainer } from './Container';
import { checkImage } from 'utils/helpers';

interface Props {
  request: Friendship;
  isLastItem: boolean;
}

export const FriendRequestNotification = ({ request, isLastItem }: Props) => {
  const { updateFriendshipStatusLoading, handleUpdateFriendshipStatus } = useFriendship({});
  const { activeNotificationId } = useActiveNotification();
  const isActive = activeNotificationId === request.id;

  return (
    <NotificationContainer
      user={{
        firstName: request.friend?.firstName,
        secondName: request.friend?.secondName,
        username: request.friend.username,
        avatar: {
          name: request.friend.firstName,
          url: checkImage(request.friend.avatar),
        },
      }}
      createdAt={request.updatedAt}
      type={NotificationType.Friendship}
      isActive={isActive}
      isLastItem={isLastItem}
    >
      <ButtonGroup ml='auto' spacing={4} w={250}>
        <Button
          width='full'
          variant='solid'
          colorScheme='whatsapp'
          isLoading={updateFriendshipStatusLoading}
          onClick={() =>
            handleUpdateFriendshipStatus({
              status: Status.Confirmed,
              refetchUser: false,
              friendshipId: request.id as number,
            })
          }
        >
          Accept
        </Button>
        <Button
          variant='solid'
          colorScheme='red'
          width='full'
          isLoading={updateFriendshipStatusLoading}
          onClick={() =>
            handleUpdateFriendshipStatus({
              status: Status.Rejected,
              refetchUser: false,
              friendshipId: request.id as number,
            })
          }
        >
          Decline
        </Button>
      </ButtonGroup>
    </NotificationContainer>
  );
};
