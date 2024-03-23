import { styled } from 'styled-components';

import type { Book } from '@wsh-2024/schema/src/types/book';

import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';

const _Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.SMALL};
  background-color: ${Color.MONO_A};
  max-width: 192px;
  border: 1px solid ${Color.MONO_30};
`;

const _ImgWrapper = styled.div`
  > img {
    border-radius: ${Radius.SMALL} ${Radius.SMALL} 0 0;
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

export const BookCard: React.FC<Props> = ({ book }) => {
  const imageUrl = `/assets/converted/${book.image.id}_rect_192.webp`;
  const authorImageUrl = `/assets/converted/${book.author.image.id}_96.webp`;

  return (
    <_Wrapper to={`/books/${book.id}`}>
      {imageUrl != null && (
        <_ImgWrapper>
          <Image alt={book.image.alt} height={128} objectFit="cover" src={imageUrl} width={192} />
        </_ImgWrapper>
      )}

      <Flex align="stretch" direction="column" flexGrow={1} gap={Space * 1} justify="space-between" p={Space * 2}>
        <Text color={Color.MONO_100} typography={Typography.NORMAL14} weight="bold">
          {book.name}
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          {authorImageUrl != null && (
            <_AvatarWrapper>
              <Image alt={book.author.name} height={32} objectFit="cover" src={authorImageUrl} width={32} />
            </_AvatarWrapper>
          )}
          <Text color={Color.MONO_100} typography={Typography.NORMAL12}>
            {book.author.name}
          </Text>
        </Flex>
      </Flex>
    </_Wrapper>
  );
};

export const BookCardSkeleton: React.FC = () => {
  return (
    <_Wrapper to="">
      <_ImgWrapper>
        <div
          style={{
            background: '#DDDDDD',
            borderTopLeftRadius: Radius.SMALL,
            borderTopRightRadius: Radius.SMALL,
            height: 128,
            width: 192,
          }}
        />
      </_ImgWrapper>

      <Flex align="stretch" direction="column" flexGrow={1} gap={Space * 1} justify="space-between" p={Space * 2}>
        <Text color={Color.MONO_100} typography={Typography.NORMAL14} weight="bold">
          <div
            style={{
              background: '#DDDDDD',
              height: '1lh',
              width: '100%',
            }}
          />
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          <_AvatarWrapper>
            <div
              style={{
                background: '#DDDDDD',
                borderRadius: '50%',
                height: 32,
                width: 32,
              }}
            />
          </_AvatarWrapper>
          <Text color={Color.MONO_100} typography={Typography.NORMAL12}>
            <div
              style={{
                background: '#DDDDDD',
                height: '1lh',
                width: '64px',
              }}
            />
          </Text>
        </Flex>
      </Flex>
    </_Wrapper>
  );
};
