import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { SettingsIcon } from 'components/Icons';
import { CircleLoader } from 'components/Loader/Circle';
import { FriendRequestNotification } from 'components/Notifications';
import { PostReactionNotification } from 'components/Notifications/PostReaction';
import { useNotifications } from 'context/notifications-context';
import { NotificationType } from 'generated/graphql';
import { useEffect, useState } from 'react';
import NotificationsEmpty from 'assets/notification-empty.svg';
import { Link } from 'react-router-dom';
import { ROUTES_ENUM } from 'utils/constants/routes';

export const NotificationsPage = () => {
  const bgColor = useColorModeValue('bg.light.primary', 'bg.dark.primary');
  const { loading, notifications } = useNotifications();

  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  useEffect(() => {
    setFilteredNotifications(notifications);
  }, [notifications]);

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

  const MENU_OPTIONS: { title: string; value: NotificationType | 'all' }[] = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'Friendships',
      value: NotificationType.Friendship,
    },
    {
      title: 'Likes',
      value: NotificationType.Like,
    },
    {
      title: 'Shares',
      value: NotificationType.Share,
    },
    {
      title: 'Comments',
      value: NotificationType.Comment,
    },
  ];

  const handleOptionClick = (value: 'all' | NotificationType) => {
    if (value === 'all') {
      setFilteredNotifications(notifications);
    } else {
      const filtered = notifications?.filter((item) => item.__typename === value);
      setFilteredNotifications(filtered);
    }
  };

  return (
    <Box py={{ base: 2, md: 8 }}>
      <Box bg={bgColor} borderRadius='xl'>
        <Flex p={4} justifyContent='space-between' alignItems='center'>
          <Text fontWeight='semibold' fontSize='md'>
            Notifications
          </Text>
          <Menu placement='bottom-end'>
            <MenuButton
              disabled={notifications?.length === 0}
              as={IconButton}
              colorScheme='gray'
              aria-label='Options'
              icon={<SettingsIcon />}
              variant='ghost'
            />
            <MenuList>
              <MenuOptionGroup defaultValue='all' title='Filter by' type='radio'>
                {MENU_OPTIONS.map((option) => (
                  <MenuItemOption
                    value={option.value}
                    sx={{
                      ...(option.value !== 'all' &&
                        notifications?.filter((item) => item.__typename === option.value).length === 0 && {
                          opacity: 0.3,
                          pointerEvents: 'none',
                        }),
                    }}
                    onClick={() => handleOptionClick(option.value)}
                    key={option.value}
                  >
                    {option.title}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
        {notifications?.length === 0 ? (
          <VStack>
            <Image width='full' maxW='300px' src={NotificationsEmpty} />
            <Text align='center' fontSize='2xl'>
              Your notification list is empty
            </Text>
            <Button as={Link} to={ROUTES_ENUM.HOME}>
              Go home
            </Button>
          </VStack>
        ) : (
          <>
            <Divider />
            <List>
              {filteredNotifications?.map((notification, index, arr) => {
                const isLastItem = index === arr!.length - 1;
                switch (notification.__typename) {
                  case NotificationType.Friendship: {
                    return (
                      <FriendRequestNotification isLastItem={isLastItem} key={notification.id} request={notification} />
                    );
                  }

                  case NotificationType.Comment:
                  case NotificationType.Share:
                  case NotificationType.Like: {
                    return (
                      <PostReactionNotification
                        type={NotificationType[notification.__typename]}
                        isLastItem={isLastItem}
                        key={notification.id}
                        reaction={notification}
                      />
                    );
                  }
                }
              })}
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};
