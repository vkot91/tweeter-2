import { VStack } from '@chakra-ui/react';
import { BaseRecommendationBox, FriendBox } from 'components/Recommendation';

export const Recommendations = () => {
  return (
    <VStack>
      <BaseRecommendationBox title='You might like' action={{ caption: 'See all', url: '/' }}>
        <FriendBox />
      </BaseRecommendationBox>
    </VStack>
  );
};
