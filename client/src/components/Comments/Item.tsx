import { HStack, Avatar, VStack, IconButton, Box, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { Comment, useRemoveCommentMutation } from 'generated/graphql';

import { checkImage, formatDate } from 'utils/helpers';
import { DeleteIcon } from '@chakra-ui/icons';

type Props = Comment;

export const CommentItem = ({ owner, text, createdAt, id }: Props) => {
  const bg = useColorModeValue('bg.light.secondary', 'bg.dark.secondary');
  const [removeComment, { loading }] = useRemoveCommentMutation();
  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    duration: 2000,
  });

  const handleRemoveComment = async () => {
    await removeComment({
      variables: {
        id,
      },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'Comment' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
      onCompleted() {
        toast({
          title: 'Comment was succesfully deleted!',
          status: 'success',
        });
      },
      onError() {
        toast({
          title: 'Some error occured :(',
          status: 'error',
        });
      },
    });
  };

  return (
    <HStack w='100%' gap={3}>
      <Avatar name='Kostik' size='md' src={checkImage(owner.avatar)} />
      <Box borderRadius='xl' bg={bg} w='100%' py={3} px={4}>
        <HStack
          justifyContent='space-between'
          _hover={{
            '.chakra-button': {
              display: 'block',
            },
          }}
        >
          <VStack alignItems='start'>
            <Text fontWeight='semibold'>
              {owner.firstName} {owner.secondName}
            </Text>
            <Text variant='secondary' fontSize='xs'>
              {formatDate(createdAt)}
            </Text>
          </VStack>
          <IconButton
            display='none'
            isLoading={loading}
            aria-label='dots-icon'
            variant='ghost'
            colorScheme='red'
            onClick={handleRemoveComment}
          >
            <DeleteIcon />
          </IconButton>
        </HStack>
        <Text mt={3}>{text}</Text>
      </Box>
    </HStack>
  );
};
