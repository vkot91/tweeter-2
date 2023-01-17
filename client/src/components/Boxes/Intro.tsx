import { Heading, useColorModeValue, Text, VStack } from '@chakra-ui/react';

export const Intro = () => {
  const containerBgColor = useColorModeValue('bg.light.primary', 'bg.dark.primary');

  return (
    <VStack bg={containerBgColor} p={5} rounded='xl' align='flex-start'>
      <Heading size='md'>INTRO</Heading>
      <Text>Lorem</Text>
      <Text>Lorem</Text>
      <Text>Lorem</Text>
      <Text>Lorem</Text>
    </VStack>
  );
};
