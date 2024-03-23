import { memo } from 'react';
import styled from 'styled-components';

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
  width: 64px;
  height: 64px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

type Props = {
  description: string;
  id: string;
  imageId: string;
  name: string;
};

export const BookListItem: React.FC<Props> = memo(function BookListItemInner({ description, id, imageId, name }) {
  const imageUrl = `/assets/converted/${imageId}_64.webp`;

  return (
    <_Wrapper>
      <_Link to={`/books/${id}`}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          {imageUrl != null && (
            <_ImgWrapper>
              <Image alt={name} height={64} objectFit="cover" src={imageUrl} width={64} />
            </_ImgWrapper>
          )}
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {description}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </_Link>
    </_Wrapper>
  );
});
