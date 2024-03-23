import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import { Box } from '../../foundation/components/Box';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';
import { EpisodeListSection, EpisodeListSectionSkelton } from '../BookDetailPage/internal/EpisodeListSection';

import { ComicViewer } from './internal/ComicViewer';

const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  invariant(bookId);
  invariant(episodeId);

  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <ComicViewer episodeId={episodeId} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Suspense fallback={<EpisodeListSectionSkelton />}>
          <EpisodeListSection bookId={bookId} />
        </Suspense>
      </Box>
    </Box>
  );
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <EpisodeDetailPage />
    </Suspense>
  );
};

export { EpisodeDetailPageWithSuspense as EpisodeDetailPage };
