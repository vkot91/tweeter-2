import { Avatar, Box, Image, Text, Stack, Button } from '@chakra-ui/react';
import { ImageUploadIcon, UploadCloudIcon } from 'components/Icons';
import { ImageUploadEditor, UploadImage } from 'components/Image';
import { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

interface Props {
  firstName: string;
  secondName: string;
  role?: string;
  avatar?: string;
  cover?: string;
}

export const ProfileBox = ({ firstName, secondName, role = 'Front End Developer', avatar, cover }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(avatar);

  const setImage = (url: string) => {
    setPreviewUrl(url);
  };

  const handleChange = (file: File) => {
    console.log(file);
  };

  return (
    <Box w='full' rounded='xl' overflow='hidden' boxShadow='md'>
      <Image
        h='350px'
        w='full'
        src={
          cover ||
          'https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
        }
        objectFit='cover'
      />
      <Box mt='-10rem' p={10}>
        <Avatar w={150} h={150} src={previewUrl} name={firstName} css={{ border: '5px solid white' }}>
          <Box pos='absolute' right='0' bottom={2}>
            <UploadImage
              icon={<UploadCloudIcon color='white' />}
              id='upload-avatar'
              setImage={setPreviewUrl}
              onChange={handleChange}
              bgColor='white'
              _hover={{ bg: '#ebedf0' }}
              _active={{ bg: '#ebedf0' }}
              borderRadius='3xl'
              boxShadow='xl'
            />
          </Box>
        </Avatar>
        <Stack justify='space-between' direction='row' flexWrap='wrap'>
          <Stack spacing={0} mb={5}>
            <Text fontSize='2xl' fontWeight={700}>
              {firstName} {secondName}
            </Text>
            <Text color='gray.600'>{role}</Text>
          </Stack>
          <Button mt={8} colorScheme='gray'>
            Edit basic info
          </Button>
        </Stack>
        <ImageUploadEditor />
      </Box>
    </Box>
  );
};
