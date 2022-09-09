import { Avatar, Box, ButtonGroup, HStack, Text, VStack, Button } from '@chakra-ui/react';
import { PersonAddIcon } from 'components/Icons';

export const FriendBox = () => {
  return (
    <Box w='100%' p={4}>
      <HStack gap={4} mb={5}>
        <Avatar size='md' name='K' />
        <VStack align='flex-start'>
          <Text fontWeight='semibold' mb={0}>
            Radovan SKillArena
          </Text>
          <Text mt={0} variant='secondary' fontSize='sm'>
            Founder & CEO at Trophy
          </Text>
        </VStack>
      </HStack>
      <ButtonGroup justifyContent='space-between' w='full' spacing={5}>
        <Button variant='outline' colorScheme='gray' width='full'>
          Ignore
        </Button>
        <Button leftIcon={<PersonAddIcon />} width='full' variant='solid'>
          Add friend
        </Button>
      </ButtonGroup>
    </Box>
  );
};
