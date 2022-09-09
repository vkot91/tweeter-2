import { Avatar, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { AutoResizeTextarea } from 'components/Form';
import { useForm } from 'react-hook-form';

interface FormValues {
  description: string;
}

export const CommentForm = () => {
  const { register, reset, handleSubmit, control } = useForm<FormValues>();
  const bgColor = useColorModeValue('bg.light.secondary', 'bg.dark.secondary');

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Box as='form' w='100%' onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={2}>
        <Avatar size='sm' name='K' />
        <AutoResizeTextarea bgColor={bgColor} minRows={1} border='none' placeholder='Write a comment' />
      </Flex>
    </Box>
  );
};
