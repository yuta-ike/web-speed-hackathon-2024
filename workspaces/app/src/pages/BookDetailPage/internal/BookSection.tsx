import styled from 'styled-components';

import { useBook } from '../../../features/book/hooks/useBook';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

import { BottomNavigator } from './BottomNavigator';

const _HeadingWrapper = styled.section`
  display: grid;
  align-items: start;
  grid-template-columns: auto 1fr;
  padding-bottom: ${Space * 2}px;
  gap: ${Space * 2}px;
`;

const _AuthorWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: ${Space * 1}px;
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type BookSectionProps = {
  bookId: string;
};

export const BookSection = ({ bookId }: BookSectionProps) => {
  const { data: book } = useBook({ params: { bookId } });

  const bookImageUrl = `/assets/converted/${book.image.id}_rect_lg.webp`;
  const auhtorImageUrl = `/assets/converted/${book.author.image.id}_32.webp`;

  const latestEpisodeId = book.episodes[0]?.id ?? '';
  return (
    <>
      <_HeadingWrapper aria-label="作品情報">
        <Image alt={book.name} height={256} loading="eager" objectFit="cover" src={bookImageUrl} width={192} />
        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
          <Box>
            <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
              {book.name}
            </Text>
            <Spacer height={Space * 1} />
            <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
              {book.description}
            </Text>
          </Box>

          <Spacer height={Space * 1} />

          <_AuthorWrapper to={`/authors/${book.author.id}`}>
            {auhtorImageUrl != null && (
              <_AvatarWrapper>
                <Image
                  alt={book.author.name}
                  height={32}
                  loading="eager"
                  objectFit="cover"
                  src={auhtorImageUrl}
                  width={32}
                />
              </_AvatarWrapper>
            )}
            <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
              {book.author.name}
            </Text>
          </_AuthorWrapper>
        </Flex>
      </_HeadingWrapper>
      <BottomNavigator bookId={bookId} latestEpisodeId={latestEpisodeId} />
    </>
  );
};

type BookSectionSkeletonProps = {
  bookId: string;
};

export const BookSectionSkeleton = ({ bookId }: BookSectionSkeletonProps) => {
  return (
    <>
      <_HeadingWrapper aria-label="作品情報">
        <div style={{ background: '#DDDDDD', height: 256, width: 192 }} />

        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
          <Box width="100%">
            <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
              <div
                style={{
                  background: '#DDDDDD',
                  borderRadius: '4px',
                  height: '1lh',
                  width: '220px',
                }}
              />
            </Text>
            <Spacer height={Space * 1} />
            <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
              <span
                aria-hidden
                style={{
                  background: '#DDDDDD',
                  borderRadius: '4px',
                  color: '#DDDDDD',
                  userSelect: 'none',
                }}
              >
                近頃自我とか自覚とか唱えていくら自分の勝手な真似をしても構わないという符徴に使うようですが、その中に
              </span>
            </Text>
          </Box>

          <Spacer height={Space * 1} />

          <_AuthorWrapper to="">
            <_AvatarWrapper>
              <div style={{ background: '#DDDDDD', borderRadius: '50%', height: 32, width: 32 }} />
            </_AvatarWrapper>
            <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
              <div
                style={{
                  background: '#DDDDDD',
                  borderRadius: '4px',
                  height: '1lh',
                  width: '87.55px',
                }}
              />
            </Text>
          </_AuthorWrapper>
        </Flex>
      </_HeadingWrapper>
      <BottomNavigator bookId={bookId} latestEpisodeId="" />
    </>
  );
};
