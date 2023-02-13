import { Avatar, Box, CloseButton, Flex } from '@chakra-ui/react';
import { checkImage } from 'utils/helpers';
import { NotificationToastProps } from './types';

interface Props extends NotificationToastProps {
  children: JSX.Element[] | JSX.Element;
}

export const NotificationToastLayout = ({ children, onClick, owner, id, onToastClose }: Props) => {
  return (
    <Flex
      position='relative'
      borderRadius='xl'
      maxWidth='350px'
      gap={3}
      align='center'
      color='white'
      p={3}
      bg='blue.500'
      cursor='pointer'
      onClick={() => (onClick ? onClick(id) : null)}
    >
      <Avatar size='md' src={checkImage(owner.avatar)} name={owner.firstName} />
      <Box>{children}</Box>
      <CloseButton onClick={onToastClose} position={'absolute'} right={3} top={1} size='sm' />
    </Flex>
  );
};
