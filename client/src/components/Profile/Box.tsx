import { Avatar, Box, Image, Text, Stack, Button, useDisclosure } from '@chakra-ui/react';
import { EditProfileModal } from 'components/Profile';
import defaultBg from 'assets/default-bg.avif';
import { Friendship, User } from 'generated/graphql';
import { checkImage } from 'utils/helpers';
import { useAuth } from 'context/authed-user-context';
import { useFriendship } from 'hooks/use-friendship';
import { useFriends } from 'context/friends-context';

interface Props extends User {
  userLoading: boolean;
}

export const ProfileBox = (props: Props) => {
  const { avatar, firstName, secondName, bio, id } = props;
  const { authedUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { friendships } = useFriends();
  const isOwnerPage = authedUser?.id === id;
  const activeFriendship =
    !isOwnerPage && friendships?.length && friendships?.find((friendship) => friendship?.friend_id === id);

  const { content } = useFriendship({
    friendship: activeFriendship as Friendship,
    isOwnerPage,
    profileId: id,
  });

  return (
    <Box w='full' rounded='xl' overflow='hidden' boxShadow='md'>
      <Image h='300px' w='full' src={defaultBg} objectFit='cover' />
      <Box mt='-10rem' p={10}>
        <Avatar
          w={150}
          h={150}
          src={checkImage(avatar)}
          name={firstName}
          border='5px solid white'
          _dark={{ borderColor: 'bg.dark.secondary' }}
        />
        <Stack justify='space-between' direction='row' flexWrap='wrap'>
          <Stack spacing={0} mb={5}>
            <Text fontSize='2xl' fontWeight={700}>
              {firstName} {secondName}
            </Text>
            <Text color='gray.600'>{bio}</Text>
          </Stack>
          {isOwnerPage && (
            <Button colorScheme='gray' onClick={onOpen}>
              Edit basic info
            </Button>
          )}
          {content}
        </Stack>
        <EditProfileModal
          userInfo={props}
          onOpenProfileModal={onOpen}
          isOpen={isOpen}
          onCloseProfileModal={onClose}
          bgUrl={defaultBg}
        />
      </Box>
    </Box>
  );
};
