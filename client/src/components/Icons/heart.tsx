import { Icon } from '@chakra-ui/react';
import { IconProps } from './types';

export const HeartIcon = ({ color, filled = false }: IconProps) => (
  <Icon w={6} h={6} color={color} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
    <path
      fill={filled ? 'currentColor' : 'none'}
      stroke='currentColor'
      d='M 5.046875 2.5058594 C 2.932905 2.5058594 1.5136719 4.2169781 1.5136719 6.3300781 C 1.5136719 8.7278781 4.863605 11.592759 7.734375 13.505859 C 10.605135 11.592759 13.916338 8.6816781 13.955078 6.3300781 C 13.989878 4.2172781 12.621783 2.5058594 10.507812 2.5058594 C 9.6059423 2.5058594 8.691295 2.9829531 7.734375 3.9394531 C 6.777445 2.9829531 5.948745 2.5058594 5.046875 2.5058594 z '
    />
  </Icon>
);
