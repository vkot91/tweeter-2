import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePostsLazyQuery } from 'generated/graphql';
import { GetPostsActions } from 'types';

interface UseGetTweetsProps {
  ownerId?: number;
  limit?: number;
  action: GetPostsActions;
  initialPage?: number;
}

export const useGetPosts = ({ ownerId, limit = 3, action, initialPage = 1 }: UseGetTweetsProps) => {
  const [activePage, setActivePage] = useState<number>(initialPage);
  const [newPostsLoading, setIsNewPostsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { data, loading, error, fetchMore, refetch }] = usePostsLazyQuery({
    variables: {
      paginationPostsInput: {
        ownerId: ownerId!,
        take: limit,
        activePage,
        action,
      },
    },
  });
  useEffect(() => {
    if (ownerId) {
      refetch({
        paginationPostsInput: {
          ownerId: ownerId!,
          take: limit,
          activePage: 1,
          action,
        },
      });
    }
    setActivePage(1);
  }, [ownerId, refetch, action, limit]);

  // useEffect(() => {
  //   refetch();
  //   setActivePage(1);
  // }, [username]);

  const isBottom = (el: Element) => Math.ceil(el.getBoundingClientRect().bottom) === window.innerHeight - 32;

  const loadMore = useCallback(() => {
    const nextPage = activePage + 1;
    setActivePage(nextPage);
    setIsNewPostsLoading(true);
    fetchMore({
      variables: {
        paginationPostsInput: {
          ownerId,
          activePage: nextPage,
          action,
        },
      },
    }).then(() => setIsNewPostsLoading(false));
  }, [activePage, ownerId, fetchMore, action]);

  const scrolling = useCallback(() => {
    const wrappedElement = document.getElementById('posts-container');
    if (wrappedElement && isBottom(wrappedElement)) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    if (data?.posts.hasMore && typeof window !== undefined) document.addEventListener('scroll', scrolling);
    return () => {
      document.removeEventListener('scroll', scrolling);
    };
  }, [scrolling, data?.posts.hasMore]);

  return {
    loading,
    posts: data?.posts.items,
    error,
    newPostsLoading,
  };
};
