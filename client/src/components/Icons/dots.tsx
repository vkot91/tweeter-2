import { Icon, IconProps } from '@chakra-ui/react';

export const DotsIcon = ({ color }: IconProps) => {
  return (
    <Icon w={6} h={6} color={color} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
      <rect width='256' height='256' fill='none' />
      <circle fill='currentColor' cx='64' cy='128' r='24' />
      <circle fill='currentColor' cx='128' cy='128' r='24' />
      <circle fill='currentColor' cx='192' cy='128' r='24' />
    </Icon>
  );
};
