import { useState } from 'react';
import { Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, AvatarGroup, Box, Divider, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { PostImage } from 'components/Image';
import { CommentForm, CommentsList } from 'components/Comments';
import { PostReactions } from './Reactions';
import { Post, useRemovePostMutation } from 'generated/graphql';
import { checkImage } from 'utils/helpers';
import { formatDate } from 'utils/helpers/format-date';
import { PostActions } from './Actions';
import { useToast } from '@chakra-ui/react';
import { useAuth } from 'context/authed-user-context';
import { ShareIcon } from 'components/Icons';
import { replaceProfileLink } from 'utils/helpers/replace-profile-link';

interface Props extends Post {
  isPageOwner?: boolean;
}

export const PostItem = ({
  id,
  image,
  owner,
  description,
  createdAt,
  updatedAt,
  likes,
  shares,
  comments,
  isPageOwner,
}: Props) => {
  const [visibleCommentField, setVisibleCommentField] = useState(false);
  const [visibleComments, setVisibleComments] = useState(false);
  const { authedUser } = useAuth();
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

  const toggleCommentFieldVisibility = () => {
    setVisibleCommentField(!visibleCommentField);
  };

  const toggleCommentsVisibility = () => {
    setVisibleComments(!visibleComments);
  };

  const isPostOwner = authedUser?.id === owner.id;

  const authedUserLike = likes?.find((like) => like.ownerId === authedUser!.id);
  const authedUserShare = shares?.find((share) => share.ownerId === authedUser!.id && share.ownerId !== owner.id);

  return (
    <VStack w='100%' align='flex-start'>
      {authedUserShare && isPageOwner && (
        <HStack>
          <ShareIcon />
          <Text>
            Shared from{' '}
            <Link as={RouterLink} to={replaceProfileLink(owner.username)} variant='underlined'>
              @{owner.username}
            </Link>
          </Text>
        </HStack>
      )}
      <VStack layerStyle='box' w='100%' align='flex-start' gap={3}>
        <Flex gap={3} w='100%'>
          <Avatar size='md' name='K' />
          <VStack align='flex-start'>
            <Text fontWeight='semibold'>
              <Link as={RouterLink} to={replaceProfileLink(owner.username)} variant='pure' color='gray.800'>
                {owner.firstName} {owner.secondName}
              </Link>
            </Text>
            <Text variant='secondary' fontSize='sm'>
              {formatDate(updatedAt || createdAt)}
            </Text>
          </VStack>
          {isPostOwner && (
            <PostActions
              ownerId={owner.id}
              handleDelete={handleDelete}
              loading={removeLoading}
              formValues={{ description, image, id }}
            />
          )}
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
          {comments && comments?.length > 0 && (
            <Button marginLeft='auto !important' variant='link' colorScheme='gray' onClick={toggleCommentsVisibility}>
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </Button>
          )}
          {likes && likes?.length > 0 && (
            <Text ml={3}>
              {likes.length} {likes.length === 1 ? 'like' : 'likes'}
            </Text>
          )}
          {shares && shares.length > 0 && (
            <Text ml={3}>
              {shares.length} {shares.length === 1 ? 'share' : 'shares'}
            </Text>
          )}
        </HStack>
        <Box w='full'>
          <Divider />
          <PostReactions
            commentButtonClick={toggleCommentFieldVisibility}
            canShare={!isPostOwner}
            postId={id}
            likeActive={authedUserLike}
            shareActive={authedUserShare}
          />
          <Divider />
        </Box>
        {visibleComments && <CommentsList comments={comments} />}
        {visibleCommentField && <CommentForm helper={() => setVisibleComments(true)} postId={id} />}
      </VStack>
    </VStack>
  );
};
