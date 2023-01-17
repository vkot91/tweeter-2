import { Box, Divider, Flex, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { SettingsIcon } from 'components/Icons';
import { CircleLoader } from 'components/Loader/Circle';
import { FriendRequestNotification } from 'components/Notifications';
import { useFriendsRequests } from 'context/friends-requests-context';
import { formatDate } from 'utils/helpers/format-date';

export const NotificationsPage = () => {
  const bgColor = useColorModeValue('bg.light.primary', 'bg.dark.primary');
  const { friendsRequests, loading } = useFriendsRequests();

  const requestsWithDates = [...friendsRequests]
    .sort((a, b) => {
      if (a?.createdAt && b?.createdAt) {
        return +b.createdAt - +a.createdAt;
      }
      return 1;
    })
    .map((item) => ({
      ...item,
      createdAt: formatDate(item?.createdAt as string),
    }));

  if (loading) {
    return (
      <CircleLoader
        size={100}
        wrapperProps={{
          marginY: 10,
        }}
      />
    );
  }

  return (
    <Box py={{ base: 2, md: 8 }}>
      <Box bg={bgColor} borderRadius='xl'>
        <Flex p={4} justifyContent='space-between'>
          <Text fontWeight='semibold'>Notifications</Text>
          <IconButton aria-label='settings-icon' variant='ghost' colorScheme='gray'>
            <SettingsIcon />
          </IconButton>
        </Flex>
        {requestsWithDates.map((request, index) =>
          request ? (
            <Box key={request.id}>
              {index === 0 && <Divider />}
              <FriendRequestNotification request={request} />
              {index !== requestsWithDates.length - 1 && <Divider />}
            </Box>
          ) : null,
        )}
      </Box>
    </Box>
  );
};
