import { Grid, GridItem, Show, VStack } from '@chakra-ui/react';
import { ProfileBox } from 'components/Boxes';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { CircleLoader } from 'components/Loader/Circle';
import { PostForm, PostsList } from 'components/Posts';
import { BaseRecommendationBox, FriendBox } from 'components/Recommendation';
import { useAuth } from 'context/authed-user-context';
import { useUserQuery } from 'generated/graphql';
import { useGetPosts } from 'hooks/use-get-posts';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

export const ProfilePage = () => {
  //   const { authedUser } = useAuth();
  const { username } = useParams();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserQuery({
    variables: {
      getUserInput: {
        username,
      },
    },
  });

  const userId = userData?.user.id;

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useGetPosts({
    ownerId: userId,
  });

  return (
    <VStack>
      <ErrorBoundary isError={!!userError}>
        <Fragment>
          {userLoading && <CircleLoader />}
          {userData && <ProfileBox secondName={userData.user.firstName} firstName={userData.user.firstName} />}
          {/* <PostForm mb={10} ownerId={authedUser!.id} /> */}
          {/* <ErrorBoundary isError={!!postsError} message={postsError?.message}>
          <PostsList loading={postsLoading} posts={posts} />
        </ErrorBoundary> */}

          {/* <Show above='md'>
        <GridItem area='sidebar'>
        <VStack>
        <BaseRecommendationBox title='You might like' action={{ caption: 'See all', url: '/' }}>
        <FriendBox />
        </BaseRecommendationBox>
        </VStack>
        </GridItem>
      </Show> */}
        </Fragment>
      </ErrorBoundary>
    </VStack>
  );
};
