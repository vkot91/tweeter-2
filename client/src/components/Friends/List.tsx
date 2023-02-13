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
import { useEffect, useState } from 'react';
export const FriendsList = () => {
  const { friendships, loading } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState(friendships);

  useEffect(() => {
    setFilteredFriends(friendships);
  }, [friendships]);

  const handleSearch = (searchTerm: string) => {
    const friends = friendships.filter((friendship) =>
      friendship.friend.firstName.concat(friendship.friend.secondName).toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredFriends(friends);
  };

  return (
    <VStack spacing={7}>
      <InputGroup maxW='xl'>
        <Input
          type='text'
          onChange={(e) => handleSearch(e.target.value)}
          borderColor='gray.300'
          placeholder='Search friends!'
        />
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
        {filteredFriends?.map((friendship) => (
          <HStack key={friendship.id} w='full'>
            <Avatar name='K' size='sm' />
            <Text fontWeight='semibold'>
              <Link as={RouterLink} to={replaceProfileLink(friendship.friend.username)} variant='pure'>
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
        {friendships.length > 0 && filteredFriends.length === 0 && (
          <Text variant='secondary'>Please update your search term </Text>
        )}
      </VStack>
    </VStack>
  );
};
