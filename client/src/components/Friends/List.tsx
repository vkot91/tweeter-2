import {
  VStack,
  InputGroup,
  Input,
  InputLeftElement,
  HStack,
  Text,
  IconButton,
  Avatar,
  Link,
  Box,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { DotsIcon, SearchIcon } from 'components/Icons';
import { CircleLoader } from 'components/Loader/Circle';
import { useFriends } from 'context/friends-context';
import { formatDate, getSecondsDifferenceBetweenDates } from 'utils/helpers';
import { replaceProfileLink } from 'utils/helpers/replace-profile-link';
export const FriendsList = () => {
  const { friendships, loading } = useFriends();
  return (
    <VStack spacing={7}>
      <InputGroup maxW='xl'>
        <Input type='text' borderColor='gray.300' placeholder='Search friends!' />
        <InputLeftElement pointerEvents='none'>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>
      <HStack justify='space-between' w='full'>
        <Text fontWeight='bold'>Friends</Text>
        <IconButton aria-label='menu' variant='ghost' colorScheme='gray' size='xs'>
          <DotsIcon />
        </IconButton>
      </HStack>
      <VStack w='full' spacing={5}>
        {loading && <CircleLoader size='50px' />}
        {friendships?.map((friendship) => (
          <HStack key={friendship.id} w='full'>
            <Avatar name='K' size='sm' />
            <Text fontWeight='semibold'>
              <Link as={RouterLink} to={replaceProfileLink(friendship.friend.username)} variant='pure' color='gray.800'>
                {friendship.friend.firstName} {friendship.friend.secondName}{' '}
              </Link>
            </Text>
            {getSecondsDifferenceBetweenDates(friendship.friend.lastSeen) > 60 ? (
              <Text variant='secondary' ml='auto !important' fontSize='sm'>
                {formatDate(friendship.friend.lastSeen)}
              </Text>
            ) : (
              <Box ml='auto !important' bg='green.400' w={3} h={3} borderRadius='50%' />
            )}
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

//Online users - list filter by friends (query)
//New user come to website - mutation update (lastSeen:now) trigger lastSeenMutated
// ON ui (get new user) and update on the online users list (friends arr get updated too)
