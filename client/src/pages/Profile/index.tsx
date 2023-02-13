import { Grid, GridItem, Show, useColorModeValue, VStack } from '@chakra-ui/react';
import { ProfileBox } from 'components/Profile';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { CircleLoader } from 'components/Loader/Circle';
import { useAuth } from 'context/authed-user-context';
import { GetPostsActionType, Post, User, useUserQuery } from 'generated/graphql';
import { useGetPosts } from 'hooks/use-get-posts';
import { useParams } from 'react-router-dom';
import { Intro } from 'components/Boxes/Intro';
import { PostForm, PostsList } from 'components/Posts';

export const ProfilePage = () => {
  const { authedUser } = useAuth();
  const { username } = useParams();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    previousData,
  } = useUserQuery({
    variables: {
      getUserInput: {
        username,
      },
    },
  });

  const user = userData?.user as User;

  const {
    posts,
    loading: postsLoading,
    error: postsError,
    newPostsLoading,
  } = useGetPosts({
    ownerId: user?.id,
    action: GetPostsActionType.Owner,
    initialPage: 1,
  });

  const containerBgColor = useColorModeValue('bg.light.secondary', 'bg.dark.secondary');

  if (userLoading && !previousData) {
    return (
      <CircleLoader
        wrapperProps={{
          paddingY: 20,
        }}
        size={20}
      />
    );
  }

  const isPageOwner = user?.id === authedUser?.id;

  return (
    <ErrorBoundary isError={!!userError} message={userError?.message}>
      <VStack pr={{ base: 0, md: 3 }} pt={5} spacing={5} w='full'>
        {userData && <ProfileBox userLoading={userLoading} {...user} />}
        <Grid
          w='full'
          bg={containerBgColor}
          px={4}
          py={{ base: 2, md: 8 }}
          templateColumns={{ base: '0 1fr', md: '0 1fr', lg: '0.6fr 1fr ', xl: '0.5fr 1fr 0.5fr' }}
          gridTemplateAreas={`'intro posts sidebar'`}
          templateRows='1fr'
          rounded='xl'
          gap={8}
          minH='80vh'
        >
          <Show above='sm'>
            <GridItem area='intro'>
              <Intro />
            </GridItem>
          </Show>
          <GridItem area='posts' w='full'>
            {isPageOwner && <PostForm mb={10} ownerId={authedUser!.id} action={GetPostsActionType.Owner} />}
            <ErrorBoundary isError={!!postsError} message={postsError?.message}>
              <PostsList isPageOwner={isPageOwner} loading={postsLoading} posts={posts as Post[]} />
            </ErrorBoundary>
            {newPostsLoading && (
              <CircleLoader
                wrapperProps={{
                  marginTop: '5',
                }}
                size='50'
              />
            )}
          </GridItem>
          <Show above='xl'>
            <GridItem area='sidebar'>
              <Intro />
            </GridItem>
          </Show>
        </Grid>
      </VStack>
    </ErrorBoundary>
  );
};
