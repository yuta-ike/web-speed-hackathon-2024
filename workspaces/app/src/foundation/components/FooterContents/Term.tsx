import styled from 'styled-components';

import { TERM } from '../../constants/Term';
import { Color, Space, Typography } from '../../styles/variables';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

const _Content = styled.section`
  white-space: pre-line;
`;

export const Term = () => {
  return (
    <_Content aria-labelledby="termDialog" role="dialog">
      <Text as="h2" color={Color.MONO_100} id="termDialog" typography={Typography.NORMAL16}>
        利用規約
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {TERM}
      </Text>
    </_Content>
  );
};
