import { Avatar, Box, CloseButton, Flex, FlexProps, Text } from '@chakra-ui/react';

interface Props extends Omit<FlexProps, 'id' | 'onClick'> {
  id: number;
  firstName: string;
  secondName: string;
  avatar?: string;
  onTostClose: () => void;
  onClick?: (id: number) => void;
}

export const FriendRequestToast = ({ firstName, secondName, avatar, onTostClose, id, onClick }: Props) => {
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
      <Avatar size='md' src={avatar} name={firstName} />
      <Box>
        <Text fontSize='sm' fontWeight='bold' color='white'>
          New friend request
        </Text>
        <Text fontSize='sm' color='white'>
          {firstName} {secondName} want to add you to the friend list
        </Text>
      </Box>
      <CloseButton onClick={onTostClose} position={'absolute'} right={3} top={3} size='sm' />
    </Flex>
  );
};
