import { FeatureCard, FeatureCardSkelton } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Space } from '../../../foundation/styles/variables';

export const PickUpSection = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
        {featureList?.map((feature, index) => <FeatureCard key={feature.id} book={feature.book} inFv={index < 3} />)}
      </Flex>
    </Box>
  );
};

export const PickUpSectionSkeleton = () => {
  return (
    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <FeatureCardSkelton key={i} />
          ))}
      </Flex>
    </Box>
  );
};
