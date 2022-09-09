import { VStack, InputGroup, Input, InputLeftElement, HStack, Text, IconButton, Avatar, Badge } from '@chakra-ui/react';
import { DotsIcon, SearchIcon } from 'components/Icons';

export const FriendsList = () => {
  return (
    <VStack spacing={7}>
      <InputGroup maxW='xl'>
        <Input type='text' borderColor='gray.300' placeholder='Search friends!' />
        <InputLeftElement pointerEvents='none'>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>
      <HStack justify='space-between' w='full'>
        <Text fontWeight='bold'>Friends</Text>
        <IconButton aria-label='menu' variant='ghost' colorScheme='gray' size='xs'>
          <DotsIcon />
        </IconButton>
      </HStack>
      <VStack w='full' spacing={5}>
        <HStack w='full'>
          <Avatar name='K' size='sm' mr={3} />
          <Text fontWeight='semibold'>Kostiantyn Voskoboinik</Text>
          <Text variant='secondary' ml='auto !important' fontSize='sm'>
            2 min
          </Text>
        </HStack>
        <HStack w='full'>
          <Avatar name='K' size='sm' mr={3} />
          <Text fontWeight='semibold'>Kostiantyn Voskoboinik</Text>
          <Badge colorScheme='whatsapp' variant='solid' w={3} h={3} borderRadius='xl' ml='auto !important' />
        </HStack>
      </VStack>
    </VStack>
  );
};
