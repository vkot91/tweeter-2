import { Button, useColorModeValue, VStack } from '@chakra-ui/react';
import { Comment } from 'generated/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useState } from 'react';
import { CommentItem } from './Item';

interface Props {
  comments: Maybe<Comment[]> | undefined;
}

const commentsPerRow = 3;

export const CommentsList = ({ comments }: Props) => {
  const [next, setNext] = useState(commentsPerRow);

  const handleMoreComments = () => {
    setNext(next + commentsPerRow);
  };

  const canMore = next <= comments!.length;

  return (
    <VStack
      pr={3}
      sx={{
        '::-webkit-scrollbar': {
          pl: '1rem',
          width: '4px',
          opacity: '0.1',
        },
        '::-webkit-scrollbar-track': {
          width: '6px',
          opacity: 0.5,
        },
        '::-webkit-scrollbar-thumb': {
          background: useColorModeValue('bg.light.secondary', 'bg.dark.secondary'),
          borderRadius: '25px',
        },
      }}
      maxHeight='200'
      overflowY={'scroll'}
      w='full'
      gap={4}
    >
      {comments && comments.slice(0, next)?.map((comment) => <CommentItem key={comment.id} {...comment} />)}
      {canMore && (
        <Button colorScheme='blue' p={4} onClick={handleMoreComments}>
          Load more
        </Button>
      )}
    </VStack>
  );
};
