import { DeleteIcon } from '@chakra-ui/icons';
import { Avatar, Box, BoxProps, Button, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AutoResizeTextarea } from 'components/Form';
import { PostImage, UploadImage } from 'components/Image';
import { PostsDocument, useCreatePostMutation, useUpdatePostMutation } from 'generated/graphql';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GetPostsActions } from 'types';
import { checkImage } from 'utils/helpers';
import { postCreateValidationSchema } from 'utils/validation/post-create';

interface FormValues {
  description: string;
  file?: File | string;
}

interface Props extends BoxProps {
  ownerId: number;
  defaultValues?: {
    file?: string;
    id: number;
    description: string;
  };
  action?: GetPostsActions;
  helperFunc?: () => void;
}

export const PostForm = ({ ownerId, defaultValues, helperFunc, action, ...rest }: Props) => {
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(postCreateValidationSchema),
    shouldFocusError: false,
    defaultValues,
  });
  const defaultImage = defaultValues?.file;
  const [previewImage, setPreviewImage] = useState<string | undefined>(checkImage(defaultImage));
  const bgColor = useColorModeValue('bg.light.secondary', 'bg.dark.secondary');

  const onSubmit = async (postInput: FormValues) => {
    if (defaultValues && helperFunc) {
      await updatePost({
        variables: {
          updatePostInput: {
            id: defaultValues.id,
            description: postInput.description,
            ...(postInput.file !== defaultImage && { file: postInput.file || null }),
          },
        },
      });
      helperFunc();
    }
    if (!defaultValues) {
      await createPost({
        variables: {
          createPostInput: postInput,
        },
        refetchQueries: [
          {
            query: PostsDocument,
            variables: {
              paginationPostsInput: {
                activePage: 1,
                ownerId,
                action,
              },
            },
          },
        ],
        onCompleted: () => {
          reset();
          onClearImage();
        },
        onError: (error) => {
          setError('description', {
            message: error?.message,
          });
        },
      });
    }
  };

  const onClearImage = () => {
    setPreviewImage(undefined);
    setValue('file', undefined);
  };
  return (
    <Box as='form' layerStyle='box' {...rest} onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={4}>
        <Avatar w={10} h={10} name='K' />
        <Controller
          key='description'
          name='description'
          control={control}
          defaultValue=''
          rules={{ required: true }}
          render={({ field }) => (
            <AutoResizeTextarea
              bgColor={bgColor}
              border='none'
              error={errors?.description?.message}
              placeholder="What's happening?"
              {...field}
            />
          )}
        />
      </Flex>
      {previewImage && (
        <Box mt={3}>
          <IconButton
            variant='ghost'
            onClick={onClearImage}
            colorScheme='red'
            aria-label='delete post image'
            float='right'
          >
            <DeleteIcon />
          </IconButton>
          <PostImage alt='post-image' url={previewImage} />
        </Box>
      )}
      <Flex mt={3} justify='space-between'>
        <Controller
          key='file'
          name='file'
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <UploadImage id='post-upload' {...field} setImage={setPreviewImage} text='Photo / Video' />
          )}
        />
        <Button px={6} type='submit' isLoading={isSubmitting}>
          Post
        </Button>
      </Flex>
    </Box>
  );
};
