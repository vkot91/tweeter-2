import { Image as ChakraImage } from '@chakra-ui/react';

interface Props {
  url: string;
  alt: string;
}

export const PostImage = ({ url, alt }: Props) => (
  <ChakraImage
    borderRadius='xl'
    w='full'
    maxH='25rem'
    objectFit='cover'
    src={
      url ||
      'https://www.visitbigsky.com/sites/default/files/styles/scale_1440/public/2021-04/The%20Mountain.jpg?itok=vW-O3W3X'
    }
    alt={alt}
  />
);
