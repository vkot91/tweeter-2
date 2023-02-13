import { Text } from '@chakra-ui/react';
import { ToastTypes } from 'types';

import { NotificationToastLayout } from './Layout';
import { NotificationToastProps } from './types';

export const PostReactionToast = (props: NotificationToastProps) => (
  <NotificationToastLayout {...props}>
    <Text fontSize='sm' color='white'>
      <b>{props.owner.firstName}</b> <b>{props.owner.secondName}</b>
      {props.type === ToastTypes.PostLike && ' liked '}
      {props.type === ToastTypes.PostShare && ' shared '}
      {props.type === ToastTypes.PostComment && ' commented '}
      your post
    </Text>
  </NotificationToastLayout>
);
