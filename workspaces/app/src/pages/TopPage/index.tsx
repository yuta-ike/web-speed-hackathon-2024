import { Suspense } from 'react';

import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { CoverSection } from './internal/CoverSection';
import { PickUpSection, PickUpSectionSkeleton } from './internal/PickUpSection';
import { RankingSection, RankingSectionSkeleton } from './internal/RankingSection';
import { RealaseSectionSkeleton, ReleaseSection } from './internal/ReleaseSection';

export const TopPage: React.FC = () => {
  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <Box aria-labelledby="pickUp" as="section" maxWidth="100%" mt={16} width="100%">
          <Text as="h2" color={Color.MONO_100} id="pickUp" typography={Typography.NORMAL20} weight="bold">
            ピックアップ
          </Text>
          <Spacer height={Space * 2} />
          <Suspense fallback={<PickUpSectionSkeleton />}>
            <PickUpSection />
          </Suspense>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby="ranking" as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id="ranking" typography={Typography.NORMAL20} weight="bold">
            ランキング
          </Text>
          <Spacer height={Space * 2} />
          <Suspense fallback={<RankingSectionSkeleton />}>
            <RankingSection />
          </Suspense>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby="today" as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id="today" typography={Typography.NORMAL20} weight="bold">
            本日更新
          </Text>
          <Spacer height={Space * 2} />
          <Suspense fallback={<RealaseSectionSkeleton />}>
            <ReleaseSection />
          </Suspense>
        </Box>
      </Box>
    </Flex>
  );
};
