import { Flex, Box, Badge, Button } from '@chakra-ui/react';

import {
  Like,
  NotificationsDocument,
  NotificationType,
  ReactionEntities,
  Share,
  useUpdateReactionMutation,
  Comment,
} from 'generated/graphql';
import { NotificationContainer } from './Container';
import { checkImage } from 'utils/helpers';
import { useActiveNotification } from 'context/active-notification-context';

interface Props {
  isLastItem: boolean;
  type: NotificationType;
  reaction: Like | Share | Comment;
}

export const PostReactionNotification = ({ type, reaction, isLastItem }: Props) => {
  const { activeNotificationId } = useActiveNotification();
  const isActive = activeNotificationId === reaction.id;
  const [updateReactionStatus, { loading }] = useUpdateReactionMutation();

  const handleClick = async () => {
    await updateReactionStatus({
      variables: {
        updateReactionInput: {
          checked: true,
          type: type as unknown as ReactionEntities,
          id: reaction.id,
        },
      },
      refetchQueries: [NotificationsDocument],
    });
  };

  return (
    <NotificationContainer
      user={{
        firstName: reaction.owner.firstName,
        secondName: reaction.owner.secondName,
        username: reaction.owner.username,
        avatar: {
          name: reaction.owner.firstName,
          url: checkImage(reaction.owner.avatar),
        },
      }}
      createdAt={reaction.updatedAt}
      type={type}
      isActive={isActive}
      isLastItem={isLastItem}
      postDescription={reaction.post.description}
    >
      <Flex gap={3} align='center' flexWrap='wrap'>
        <Box>
          {!reaction.checked && (
            <Button variant='ghost' colorScheme='red' isLoading={loading} onClick={handleClick}>
              <Badge bg='red.500' w={3} h={3} borderRadius='50%' />
            </Button>
          )}
        </Box>
      </Flex>
    </NotificationContainer>
  );
};
