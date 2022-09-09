import { Icon, IconProps } from '@chakra-ui/react';

export const RetweetIcon = ({ color }: IconProps) => {
  return (
    <Icon xmlns='http://www.w3.org/2000/svg' h={6} w={6} fill='none' viewBox='0 0 24 24' color={color}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M18.9567 10.7916C20.1002 15.0594 17.5675 19.4461 13.2998 20.5896C11.1571 21.1637 8.98434 20.8112 7.20715 19.7776'
      />
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M16.93 12.8876L18.9566 10.7916 21.0525 12.8181M4.63806 14.0277C3.49452 9.75997 6.02718 5.37327 10.2949 4.22974 12.4377 3.65559 14.6104 4.00816 16.3876 5.04175'
      />
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M6.66473 11.9318L4.63815 14.0277L2.54224 12.0012'
      />
    </Icon>
  );
};
