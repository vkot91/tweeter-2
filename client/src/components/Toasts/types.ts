import { FlexProps } from '@chakra-ui/react';
import { ToastTypes } from 'types';

export interface NotificationToastProps extends Omit<FlexProps, 'id' | 'onClick'> {
  id: number;
  owner: {
    firstName: string;
    secondName: string;
    avatar?: string | null;
  };
  type: ToastTypes;
  onToastClose: () => void;
  onClick?: (id: number) => void;
}
