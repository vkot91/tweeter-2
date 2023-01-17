import { Avatar, Box, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import { AutoResizeTextarea } from 'components/Form';
import { SendPaperIcon } from 'components/Icons';
import { Comment, PostsDocument, PostsQuery, useCreateCommentMutation } from 'generated/graphql';

interface FormValues {
  text: string;
}

export const CommentForm = ({ postId, helper }: { postId: number; helper: () => void }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const bgColor = useColorModeValue('bg.light.secondary', 'bg.dark.secondary');

  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (values: FormValues) => {
    await createComment({
      variables: {
        createCommentInput: {
          text: values.text,
          postId,
        },
      },
      update: (cache, response) => {
        const cacheData = cache.readQuery({ query: PostsDocument }) as PostsQuery;
        const comment = response.data?.createComment;
        const newPosts = cacheData.posts.items.map((post) => {
          return {
            ...post,
            comments: post.id === postId ? [comment, ...(post.comments as Comment[])] : post.comments,
          };
        });

        const newCache = Object.assign({}, cacheData, {
          posts: Object.assign({}, cacheData.posts, {
            items: newPosts,
          }),
        });
        cache.writeQuery({ query: PostsDocument, data: newCache });
      },
      onCompleted: () => {
        reset();
        helper();
      },
    });
  };

  return (
    <Box as='form' w='100%' onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={2}>
        <Avatar size='sm' name='K' />
        <Controller
          key='text'
          name='text'
          control={control}
          defaultValue=''
          rules={{ required: true }}
          render={({ field }) => (
            <AutoResizeTextarea
              bgColor={bgColor}
              minRows={1}
              border='none'
              error={errors?.text?.message}
              placeholder="What's happening?"
              {...field}
            />
          )}
        />
        <IconButton
          type='submit'
          aria-label='sendpaper'
          variant='solid'
          colorScheme='linkedin'
          isLoading={isSubmitting}
        >
          <SendPaperIcon />
        </IconButton>
      </Flex>
    </Box>
  );
};
