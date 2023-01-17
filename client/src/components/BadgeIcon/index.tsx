import { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
  children: ReactNode;
  width?: number;
  height?: number;
}
export const BadgeIcon = ({ children, width = 6, height = width, ...props }: Props) => {
  return (
    <Box
      bg='blue.200'
      minW={width}
      minH={height}
      display='flex'
      justifyContent='center'
      alignItems='center'
      borderRadius={50}
      {...props}
    >
      {children}
    </Box>
  );
};
