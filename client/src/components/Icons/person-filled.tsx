import { Icon } from '@chakra-ui/react';
import { IconProps } from './types';

export const PersonFilledIcon = ({ color, w = 6, h = 6, ...rest }: IconProps) => {
  return (
    <Icon w={w} h={h} color={color} viewBox='0 0 49 49' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path
        d='M24.5 25.98C29.4725 25.98 33.5 21.9227 33.5 16.9133C33.5 11.904 29.4725 7.84668 24.5 7.84668C19.5275 7.84668 15.5 11.904 15.5 16.9133C15.5 21.9227 19.5275 25.98 24.5 25.98Z'
        fill='currentColor'
      />
      <path
        d='M17.3786 29.2021C17.8814 29.0785 18.3971 29.3313 18.6254 29.7991L22.6893 32.7994C24.5 32.799 24.5 32.7995 26.3105 32.7991L30.3746 29.7991C30.6029 29.3313 31.1186 29.0785 31.6214 29.2021C37.0255 30.5301 42.5 33.238 42.5 37.3116V41.845H6.5V37.3116C6.5 33.238 11.9745 30.5301 17.3786 29.2021Z'
        fill='currentColor'
      />
    </Icon>
  );
};
