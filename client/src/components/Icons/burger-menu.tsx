import { Icon } from '@chakra-ui/react';
import { IconProps } from './types';

export const BurgerMenuIcon = ({ color }: IconProps) => {
  return (
    <Icon w={6} h={6} color={color} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
      <path
        fill='currentColor'
        stroke='#231f20'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M3 8h26M7 16h18M3 24h26'
        data-name='Burger Menu'
      />
    </Icon>
  );
};
