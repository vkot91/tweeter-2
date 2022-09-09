import { CircularProgress, Center, CenterProps } from '@chakra-ui/react';

export const CircleLoader = (props: CenterProps) => (
  <Center {...props}>
    <CircularProgress isIndeterminate />
  </Center>
);
