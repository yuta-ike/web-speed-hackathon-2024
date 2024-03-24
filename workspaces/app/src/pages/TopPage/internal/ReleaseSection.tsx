import { BookCard, BookCardSkeleton } from '../../../features/book/components/BookCard';
import { useRelease } from '../../../features/release/hooks/useRelease';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Space } from '../../../foundation/styles/variables';
import { getDayOfWeekStrForClient } from '../../../lib/date/getDayOfWeekStrForClient';

export const ReleaseSection = () => {
  const todayStr = getDayOfWeekStrForClient(new Date());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });

  return (
    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" gap={Space * 2} justify="flex-start">
        {release.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Flex>
    </Box>
  );
};

export const RealaseSectionSkeleton = () => {
  return (
    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" gap={Space * 2} justify="flex-start">
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
      </Flex>
    </Box>
  );
};
