import { Button, HStack } from '@chakra-ui/react';
import { CommentIcon, HeartIcon, ShareIcon } from 'components/Icons';
import { Like, Share } from 'generated/graphql';
import { usePostsReactions } from 'hooks/use-posts-reactions';

interface Props {
  likeActive?: Like;
  shareActive?: Share;
  postId: number;
  canShare: boolean;
  commentButtonClick: () => void;
}

export const PostReactions = ({ likeActive, shareActive, postId, canShare, commentButtonClick }: Props) => {
  const { handleCreateLike, handleRemoveLike, handleCreateShare, handleRemoveShare, likeLoading, shareLoading } =
    usePostsReactions();

  const likeReaction = () => {
    if (likeActive) {
      handleRemoveLike(likeActive.id);
    } else {
      handleCreateLike(postId);
    }
  };

  const shareReaction = () => {
    if (shareActive) {
      handleRemoveShare(shareActive.id);
    } else {
      handleCreateShare(postId);
    }
  };

  return (
    <HStack justify='space-between' w='full' py={1}>
      <Button
        size='sm'
        leftIcon={<HeartIcon filled={!!likeActive} />}
        variant='ghost'
        colorScheme={likeActive ? 'red' : 'gray'}
        onClick={likeReaction}
        isLoading={likeLoading}
      >
        {likeActive ? 'Liked' : 'Like'}
      </Button>
      <Button onClick={commentButtonClick} size='sm' leftIcon={<CommentIcon />} variant='ghost' colorScheme='gray'>
        Comment
      </Button>
      {canShare && (
        <Button
          size='sm'
          leftIcon={<ShareIcon filled={!!shareActive} />}
          isLoading={shareLoading}
          variant='ghost'
          colorScheme={shareActive ? 'green' : 'gray'}
          onClick={shareReaction}
        >
          {shareActive ? 'Shared' : 'Share'}
        </Button>
      )}
    </HStack>
  );
};
