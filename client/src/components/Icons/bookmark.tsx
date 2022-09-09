import { Icon } from '@chakra-ui/react';
import { IconProps } from './types';

export const BookmarkIcon = ({ color, filled }: IconProps) => {
  return (
    <Icon w={6} h={6} color={color} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
      <rect fill={filled ? 'currentColor' : 'none'} width='539' height='176' x='-382' y='-72' display='none' />
      <path
        fill='currentColor'
        d='M22,3H10A4.19,4.19,0,0,0,6,7.32V28a1,1,0,0,0,.49.86,1,1,0,0,0,1,0L16,24.14l8.51,4.73A1,1,0,0,0,25,29a1,1,0,0,0,.51-.14A1,1,0,0,0,26,28V7.32A4.19,4.19,0,0,0,22,3Zm2,23.3-7.51-4.17a1,1,0,0,0-1,0L8,26.3v-19A2.2,2.2,0,0,1,10,5H22a2.2,2.2,0,0,1,2,2.32Z'
      />
    </Icon>
  );
};
