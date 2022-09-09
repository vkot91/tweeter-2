import { Icon, IconProps } from '@chakra-ui/react';

export const EmojiIcon = ({ color }: IconProps) => {
  return (
    <Icon
      w={7}
      h={7}
      color={color}
      xmlns='http://www.w3.org/2000/svg'
      className='icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </Icon>
  );
};
