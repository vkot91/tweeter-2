import { Button, HStack } from '@chakra-ui/react';
import { CommentIcon, HeartIcon, ShareIcon } from 'components/Icons';

export const PostReactions = () => {
  return (
    <HStack justify='space-between' w='full' py={1}>
      <Button size='sm' leftIcon={<HeartIcon />} variant='ghost' colorScheme='gray'>
        Like
      </Button>
      <Button size='sm' leftIcon={<CommentIcon />} variant='ghost' colorScheme='gray'>
        Comment
      </Button>
      <Button size='sm' leftIcon={<ShareIcon />} variant='ghost' colorScheme='gray'>
        Share
      </Button>
    </HStack>
  );
};
