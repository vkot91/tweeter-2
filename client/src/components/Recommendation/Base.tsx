import { Box, HStack, Text, Link, Divider } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  title: string;
  action: {
    caption: string;
    url: string;
  };

  children: JSX.Element;
}

export const BaseRecommendationBox = ({ title, action, children }: Props) => (
  <Box layerStyle='box' w='full' p={0}>
    <HStack p={4} justify='space-between'>
      <Text fontWeight='bold' fontSize='xl'>
        {title}
      </Text>
      <Link as={RouterLink} to={action.url}>
        {action.caption}
      </Link>
    </HStack>
    <Divider />
    {children}
  </Box>
);
