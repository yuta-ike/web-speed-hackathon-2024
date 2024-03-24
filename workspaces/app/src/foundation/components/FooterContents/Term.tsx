import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { TERM_SUMMARY } from '../../constants/Term';
import { Color, Space, Typography } from '../../styles/variables';
import { MyDialog } from '../MyDialog';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

const _Content = styled.section`
  white-space: pre-line;
`;

type TermProps = {
  onClose: () => void;
  open: boolean;
};

export const Term = ({ onClose, open }: TermProps) => {
  const [term, setTerm] = useState(TERM_SUMMARY);
  useEffect(() => {
    setTimeout(async () => {
      const { TERM } = await import('../../constants/Term');
      setTerm(TERM);
    }, 0);
  }, []);

  return (
    <MyDialog onClose={onClose} open={open}>
      <_Content aria-labelledby="termDialog" role="dialog">
        <Text as="h2" color={Color.MONO_100} id="termDialog" typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {term}
        </Text>
      </_Content>
    </MyDialog>
  );
};
