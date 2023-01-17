import {
  Like,
  PostsDocument,
  PostsQuery,
  Share,
  useCreateLikeMutation,
  useCreateShareMutation,
  useRemoveLikeMutation,
  useRemoveShareMutation,
} from 'generated/graphql';

export const usePostsReactions = () => {
  const [createLike, { loading: createLikeLoading }] = useCreateLikeMutation();
  const [createShare, { loading: createShareLoading }] = useCreateShareMutation();
  const [removeLike, { loading: removeLikeLoading }] = useRemoveLikeMutation();
  const [removeShare, { loading: removeShareLoading }] = useRemoveShareMutation();

  const handleCreateLike = (postId: number) => {
    createLike({
      variables: {
        postId,
      },
      update: (cache, response) => {
        const cacheData = cache.readQuery({ query: PostsDocument }) as PostsQuery;
        const like = response.data?.createLike;
        const newPosts = cacheData.posts.items.map((post) => {
          return {
            ...post,
            likes: post.id === postId ? [...(post.likes as Like[]), like] : post.likes,
          };
        });
        const newCache = Object.assign({}, cacheData, {
          posts: Object.assign({}, cacheData.posts, {
            items: newPosts,
          }),
        });
        cache.writeQuery({ query: PostsDocument, data: newCache });
      },
    });
  };

  const handleCreateShare = (postId: number) => {
    createShare({
      variables: {
        postId,
      },
      update: (cache, response) => {
        const cacheData = cache.readQuery({ query: PostsDocument }) as PostsQuery;
        const share = response.data?.createShare;
        const newPosts = cacheData.posts.items.map((post) => {
          return {
            ...post,
            shares: post.id === postId ? [...(post.shares as Share[]), share] : post.shares,
          };
        });
        const newCache = Object.assign({}, cacheData, {
          posts: Object.assign({}, cacheData.posts, {
            items: newPosts,
          }),
        });
        cache.writeQuery({ query: PostsDocument, data: newCache });
      },
    });
  };

  const handleRemoveLike = (likeId: number) => {
    removeLike({
      variables: {
        id: likeId,
      },
      update: (cache) => {
        const normalizedId = cache.identify({ id: likeId, __typename: 'Like' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };

  const handleRemoveShare = (shareId: number) => {
    removeShare({
      variables: {
        id: shareId,
      },
      update: (cache) => {
        const normalizedId = cache.identify({ id: shareId, __typename: 'Share' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };

  return {
    likeLoading: createLikeLoading || removeLikeLoading,
    shareLoading: createShareLoading || removeShareLoading,
    handleCreateLike,
    handleRemoveLike,
    handleCreateShare,
    handleRemoveShare,
  };
};
