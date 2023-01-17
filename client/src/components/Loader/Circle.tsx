import { CircularProgress, Center, CenterProps, CircularProgressProps } from '@chakra-ui/react';

export const CircleLoader = ({
  size = 'md',
  wrapperProps,
}: {
  size?: CircularProgressProps['size'];
  wrapperProps?: CenterProps;
}) => (
  <Center {...wrapperProps}>
    <CircularProgress isIndeterminate size={size} />
  </Center>
);
