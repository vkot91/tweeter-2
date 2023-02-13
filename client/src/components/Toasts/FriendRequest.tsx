import { Text } from '@chakra-ui/react';
import { ToastTypes } from 'types';
import { NotificationToastLayout } from './Layout';
import { NotificationToastProps } from './types';

type ContentType = {
  [key in ToastTypes]?: {
    title: string;
    description: string;
  };
};

const CONTENT: ContentType = {
  [ToastTypes.NewFriendRequest]: {
    title: 'New friend request',
    description: 'want to add you to the friend list',
  },
  [ToastTypes.FriendRequestAccepted]: {
    title: '',
    description: 'accepted your request',
  },
};

export const FriendRequestToast = (props: NotificationToastProps) => {
  return (
    <NotificationToastLayout {...props}>
      <Text fontSize='sm' fontWeight='bold' color='white'>
        {CONTENT[props.type]?.title}
      </Text>
      <Text fontSize='sm' color='white'>
        {props.owner.firstName} {props.owner.secondName} {CONTENT[props.type]?.description}
      </Text>
    </NotificationToastLayout>
  );
};
