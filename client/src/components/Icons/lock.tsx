import { Icon } from '@chakra-ui/react';
import { IconProps } from './types';

export const LockIcon = ({ color = 'gray.400' }: IconProps) => {
  return (
    <Icon w={5} h={5} color={color} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M5,22H19a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3H17V6A5,5,0,0,0,7,6V7H5a3,3,0,0,0-3,3v9A3,3,0,0,0,5,22ZM9,6a3,3,0,0,1,6,0V7H9ZM4,10A1,1,0,0,1,5,9H19a1,1,0,0,1,1,1v9a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1Z'
      />
      <circle fill='currentColor' cx='12' cy='14.5' r='2' />
    </Icon>
  );
};
