import { NavigateNext } from '@mui/icons-material';
import styled from 'styled-components';

import type { Book } from '@wsh-2024/schema/src/types/book';

import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';

const _Wrapper = styled.li`
  width: 100%;
`;

const _Link = styled(Link)`
  width: 100%;
`;

const _ImgWrapper = styled.div`
  width: 96px;
  height: 96px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type Props = {
  book: Book;
};

export const RankingCard: React.FC<Props> = ({ book }) => {
  const imageUrl = `/assets/converted/${book.image.id}_96.webp`;
  const authorImageUrl = `/assets/converted/${book.author.image.id}_96.webp`;

  return (
    <_Wrapper>
      <_Link to={`/books/${book.id}`}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          {imageUrl != null && (
            <_ImgWrapper>
              <Image alt={book.name} height={96} objectFit="cover" src={imageUrl} width={96} />
            </_ImgWrapper>
          )}
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" gap={Space * 1} justify="flex-end">
              {authorImageUrl != null && (
                <_AvatarWrapper>
                  <Image
                    alt={`${book.author.name}のアイコン`}
                    height={32}
                    objectFit="cover"
                    src={authorImageUrl}
                    width={32}
                  />
                </_AvatarWrapper>
              )}
              <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.author.name}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" justify="flex-end">
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <NavigateNext style={{ color: Color.Secondary, height: 32, width: 32 }} />
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </_Link>
    </_Wrapper>
  );
};

export const RankingCardSkeleton: React.FC = () => {
  return (
    <_Wrapper>
      <Spacer height={Space * 1.5} />
      <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
        <_ImgWrapper>
          <div
            style={{
              borderRadius: Radius.SMALL,
              overflow: 'hidden',
            }}
          >
            <Box backgroundColor={Color.MONO_20} height={96} width={96}>
              {null}
            </Box>
          </div>
        </_ImgWrapper>
        <Box width="100%">
          <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
            <Box width="100%">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                <div
                  style={{
                    background: '#DDDDDD',
                    height: '1lh',
                    width: '100%',
                  }}
                />
              </Text>
            </Box>
            <Box width="100%">
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                <span
                  aria-hidden
                  style={{
                    background: '#DDDDDD',
                    color: '#DDDDDD',
                    userSelect: 'none',
                  }}
                >
                  あなたがたは立派な学校に入って、立派な先生から始終指導を受けていらっしゃる、またその方々の専門的もし
                </span>
              </Text>
            </Box>
          </Flex>

          <Spacer height={Space * 1} />

          <Flex align="center" gap={Space * 1} justify="flex-end">
            <_AvatarWrapper>
              <div
                style={{
                  background: '#DDDDDD',
                  borderRadius: '50%',
                  height: 32,
                  overflow: 'hidden',
                  width: 32,
                }}
              />
            </_AvatarWrapper>
            <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
              <div
                style={{
                  background: '#DDDDDD',
                  height: '1lh',
                  width: '64px',
                }}
              />
            </Text>
          </Flex>

          <Spacer height={Space * 1} />

          <Flex align="center" justify="flex-end">
            <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
              この漫画を読む
            </Text>
            <NavigateNext style={{ color: Color.Secondary, height: 32, width: 32 }} />
          </Flex>
        </Box>
      </Flex>
      <Spacer height={Space * 1.5} />
      <Separator />
    </_Wrapper>
  );
};
