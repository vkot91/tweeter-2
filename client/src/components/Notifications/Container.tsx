import { Avatar, BackgroundProps, Box, Divider, Flex, ListItem, Show, Text, Link } from '@chakra-ui/react';
import { BadgeIcon } from 'components/BadgeIcon';
import { CommentIcon, HeartIcon, PersonFilledIcon, ShareIcon } from 'components/Icons';
import { IconProps } from 'components/Icons/types';

import { NotificationType } from 'generated/graphql';
import { Link as RouterLink } from 'react-router-dom';
import { replaceProfileLink } from 'utils/helpers';
import { motion } from 'framer-motion';

interface Props {
  isLastItem: boolean;
  isActive: boolean;
  children: JSX.Element | JSX.Element[];
  type: NotificationType;
  user: {
    firstName: string;
    secondName: string;
    username: string;
    avatar: {
      name?: string;
      url?: string;
    };
  };
  createdAt: string;
  postDescription?: string;
}

type IconSettings = {
  [key in NotificationType]: {
    badge: BackgroundProps['bg'];
    icon: IconProps['color'];
    iconComponent: React.FC<IconProps>;
    filled?: boolean;
  };
};

const ICON_SETTINGS: IconSettings = {
  [NotificationType.Like]: {
    badge: 'red.100',
    icon: 'red.500',
    iconComponent: HeartIcon,
    filled: true,
  },
  [NotificationType.Share]: {
    badge: 'green.100',
    icon: 'green.500',
    iconComponent: ShareIcon,
  },
  [NotificationType.Friendship]: {
    badge: 'blue.100',
    icon: 'blue.500',
    iconComponent: PersonFilledIcon,
  },
  [NotificationType.Comment]: {
    badge: 'yellow.100',
    icon: 'yellow.500',
    iconComponent: CommentIcon,
  },
};

const Animated = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout>
      {children}
    </motion.div>
  );
};

export const NotificationContainer = ({
  isLastItem,
  isActive,
  children,
  type,
  user,
  createdAt,
  postDescription,
}: Props) => {
  const iconDefaultProps = {
    w: 4,
    h: 4,
  };

  const setIconByType = (type: NotificationType) => {
    const ComponentName = ICON_SETTINGS[type].iconComponent;
    return (
      <BadgeIcon bg={ICON_SETTINGS[type].badge} mr={2} marginY='auto'>
        <ComponentName color={ICON_SETTINGS[type].icon} filled={ICON_SETTINGS[type].filled} {...iconDefaultProps} />
      </BadgeIcon>
    );
  };

  return (
    <Animated>
      <ListItem position='relative'>
        <Flex gap={3} align='center' flexWrap='wrap' p={4} bg={isActive ? 'blue.100' : undefined}>
          <Show above='sm'>{setIconByType(type)}</Show>
          <Avatar name='K' />
          <Box flex={1}>
            <Text fontWeight='semibold' textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' maxW='md'>
              <Link as={RouterLink} to={replaceProfileLink(user.username)} variant='underlined'>
                {user.firstName} {user.secondName}
              </Link>{' '}
              {type === NotificationType.Friendship && 'wants to be your friend'}
              {type === NotificationType.Like && `liked your post ${postDescription}`}
              {type === NotificationType.Share && `shared your post ${postDescription}`}
              {type === NotificationType.Comment && `commented your post ${postDescription}`}
            </Text>
            <Text variant='secondary' fontSize='xs'>
              {createdAt}
            </Text>
          </Box>
          {children}
        </Flex>
        {!isLastItem && <Divider />}
      </ListItem>
    </Animated>
  );
};
