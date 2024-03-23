import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import { Box } from '../../foundation/components/Box';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { BookSection, BookSectionSkeleton } from './internal/BookSection';
import { EpisodeListSection, EpisodeListSectionSkelton } from './internal/EpisodeListSection';

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<RouteParams<'/books/:bookId'>>();
  invariant(bookId);

  return (
    <Box height="100%" position="relative" px={Space * 2}>
      <Suspense fallback={<BookSectionSkeleton bookId={bookId} />}>
        <BookSection bookId={bookId} />
      </Suspense>

      <Separator />

      <section aria-label="エピソード一覧">
        <Suspense fallback={<EpisodeListSectionSkelton />}>
          <EpisodeListSection bookId={bookId} />
        </Suspense>
      </section>
    </Box>
  );
};

const BookDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <BookDetailPage />
    </Suspense>
  );
};

export { BookDetailPageWithSuspense as BookDetailPage };
