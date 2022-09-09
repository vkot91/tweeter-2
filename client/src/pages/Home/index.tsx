import { Grid, GridItem, Show, VStack } from '@chakra-ui/react';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { PostForm, PostsList } from 'components/Posts';
import { BaseRecommendationBox, FriendBox } from 'components/Recommendation';
import { useAuth } from 'context/authed-user-context';
import { useGetPosts } from 'hooks/use-get-posts';

export const HomePage = () => {
  const { authedUser } = useAuth();

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useGetPosts({
    ownerId: authedUser!.id,
  });

  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 0.5fr' }}
      gap={{ base: '0', md: '8' }}
      templateRows='1fr'
      gridTemplateAreas={`'main sidebar'`}
    >
      <GridItem area='main'>
        <PostForm mb={10} ownerId={authedUser!.id} />
        <ErrorBoundary isError={!!postsError} message={postsError?.message}>
          <PostsList loading={postsLoading} posts={posts} />
        </ErrorBoundary>
      </GridItem>
      <Show above='md'>
        <GridItem area='sidebar'>
          <VStack>
            <BaseRecommendationBox title='You might like' action={{ caption: 'See all', url: '/' }}>
              <FriendBox />
            </BaseRecommendationBox>
          </VStack>
        </GridItem>
      </Show>
    </Grid>
  );
};
