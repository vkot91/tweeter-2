import { Center, CircularProgress, VStack } from '@chakra-ui/react';
import { Post } from 'generated/graphql';

import { PostItem } from './Item';

interface Props {
  posts?: Post[];
  loading: boolean;
}

export const PostsList = ({ posts, loading }: Props) => {
  return (
    <VStack id='posts-container' spacing={7}>
      {loading && (
        <Center mt={3}>
          <CircularProgress isIndeterminate />
        </Center>
      )}
      {posts?.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </VStack>
  );
};
