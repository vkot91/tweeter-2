import { useCallback, useEffect, useState } from 'react';
import { usePostsQuery } from 'generated/graphql';

interface UseGetTweetsProps {
  ownerId?: number;
  limit?: number;
}

export const useGetPosts = ({ ownerId, limit = 3 }: UseGetTweetsProps) => {
  const [activePage, setActivePage] = useState<number>(1);

  const { data, loading, error, fetchMore } = usePostsQuery({
    variables: {
      paginationPostsInput: {
        ownerId: ownerId!,
        take: limit,
        activePage,
      },
    },
    skip: !ownerId,
    notifyOnNetworkStatusChange: true,
  });

  const isBottom = (el: Element) => Math.ceil(el.getBoundingClientRect().bottom) === window.innerHeight - 32;

  const loadMore = useCallback(() => {
    const nextPage = activePage + 1;
    setActivePage(nextPage);
    fetchMore({
      variables: {
        paginationPostsInput: {
          ownerId,
          activePage: nextPage,
        },
      },
    });
  }, [activePage, ownerId, fetchMore]);

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
  };
};
