import useSWR from 'swr';
import { api } from '@/lib/api';
import { Post } from '@/types';

export const usePosts = () => {
  const { data, error, isLoading, mutate } = useSWR<Post[]>('posts', api.getPosts);
  

  return {
    posts: data || [],
    isLoading,
    error,
    refetch: mutate
  };
};

export const usePost = (id: number) => {
  const { data, error, isLoading } = useSWR(
    id ? `post-${id}` : null,
    () => api.getPost(id)
  );

  return {
    post: data,
    isLoading,
    error
  };
};