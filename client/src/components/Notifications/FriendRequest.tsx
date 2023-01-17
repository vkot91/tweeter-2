import { Flex, Avatar, ButtonGroup, Button, Box, Text, Show } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { replaceProfileLink } from 'utils/helpers/replace-profile-link';
import { BadgeIcon } from 'components/BadgeIcon';
import { PersonFilledIcon } from 'components/Icons';
import { useFriendship } from 'hooks/use-friendship';
import { Status } from 'generated/graphql';
import { useActiveNotification } from 'context/active-notification-context';
import { FriendshipFromRequest } from 'types';

interface Props {
  request: FriendshipFromRequest;
}

export const FriendRequestNotification = ({ request }: Props) => {
  const { updateFriendshipStatusLoading, handleUpdateFriendshipStatus } = useFriendship({});
  const { notificationId } = useActiveNotification();
  const isActive = notificationId === request.id;

  return (
    <Box p={4} bg={isActive ? 'blue.100' : undefined}>
      <Flex gap={3} align='flex-start' flexWrap='wrap'>
        <Show above='sm'>
          <BadgeIcon mr={2} marginY='auto'>
            <PersonFilledIcon w={3} h={3} color='blue.700' />
          </BadgeIcon>
        </Show>
        <Avatar name='K' />
        <Box flex={1}>
          <RouterLink to={replaceProfileLink(request.friend!.username)}>
            <Text fontWeight='semibold'>
              {request.friend?.firstName} {request.friend?.secondName} wants to be your friend
            </Text>
          </RouterLink>
          <Text variant='secondary' fontSize='xs'>
            {request.createdAt}
          </Text>
        </Box>
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
      </Flex>
    </Box>
  );
};
