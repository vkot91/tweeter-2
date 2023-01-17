import { Box, BoxProps, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import errorSVG from 'assets/api-trouble.svg';
interface Props extends BoxProps {
  isError: boolean;
  message?: string;
  children: JSX.Element;
}
export const ErrorBoundary = ({ message, children, isError }: Props) => {
  return isError ? (
    <VStack>
      <Image width='full' maxW='500px' src={errorSVG} />
      {
        <Text align='center' fontSize='2xl'>
          {message || 'Some error occured. Please try again.'}
        </Text>
      }
    </VStack>
  ) : (
    children
  );
};
