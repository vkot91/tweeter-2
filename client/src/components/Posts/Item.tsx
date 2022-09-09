import { Avatar, AvatarGroup, Box, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { PostImage } from 'components/Image';
import { CommentForm } from 'components/Comment';
import { PostReactions } from './Reactions';
import { Post, useRemovePostMutation } from 'generated/graphql';
import { checkImage } from 'utils/helpers';
import { formatDate } from 'utils/helpers/format-date';
import { PostActions } from './Actions';
import { useToast } from '@chakra-ui/react';

export const PostItem = ({ id, image, owner, description, createdAt, updatedAt }: Post) => {
  const [removePost, { loading: removeLoading }] = useRemovePostMutation();
  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    duration: 2000,
  });

  const handleDelete = async () => {
    await removePost({
      variables: {
        id,
      },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'Post' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
      onCompleted() {
        toast({
          title: 'Post was succesfully deleted!',
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
    <VStack layerStyle='box' w='100%' align='flex-start' gap={3}>
      <Flex gap={3} w='100%'>
        <Avatar size='md' name='K' />
        <VStack align='flex-start'>
          <Text fontWeight='semibold'>
            {owner.firstName} {owner.secondName}
          </Text>
          <Text variant='secondary' fontSize='sm'>
            {formatDate(updatedAt || createdAt)}
          </Text>
        </VStack>
        <PostActions
          ownerId={owner.id}
          handleDelete={handleDelete}
          loading={removeLoading}
          formValues={{ description, image, id }}
        />
      </Flex>
      <Text>{description}</Text>
      {image && <PostImage url={checkImage(image)} alt='Post image' />}
      <HStack w='full'>
        <AvatarGroup size='sm' max={3}>
          <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
          <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
          <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
          <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
          <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
        </AvatarGroup>
        <Text marginLeft='auto !important'>3 comments</Text>
        <Text ml={3}>17 shares</Text>
      </HStack>
      <Box w='full'>
        <Divider />
        <PostReactions />
        <Divider />
      </Box>
      <CommentForm />
    </VStack>
  );
};
