import { RankingCard, RankingCardSkeleton } from '../../../features/ranking/components/RankingCard';
import { useRankingList } from '../../../features/ranking/hooks/useRankingList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';

export const RankingSection = () => {
  const { data: rankingList } = useRankingList({ query: {} });
  return (
    <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
      <Flex align="center" as="ul" direction="column" justify="center">
        {rankingList?.map((ranking) => <RankingCard key={ranking.id} book={ranking.book} />)}
      </Flex>
    </Box>
  );
};

export const RankingSectionSkeleton = () => {
  return (
    <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
      <Flex align="center" as="ul" direction="column" justify="center">
        <RankingCardSkeleton />
        <RankingCardSkeleton />
        <RankingCardSkeleton />
      </Flex>
    </Box>
  );
};
