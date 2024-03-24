import styled from 'styled-components';

import { OVERVIEW } from '../../constants/Overview';
import { Color, Space, Typography } from '../../styles/variables';
import { MyDialog } from '../MyDialog';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

const _Content = styled.section`
  white-space: pre-line;
`;

type Props = {
  onClose: () => void;
  open: boolean;
};

export const Overview = ({ onClose, open }: Props) => {
  return (
    <MyDialog onClose={onClose} open={open}>
      <_Content aria-labelledby={'overviewDialogA11yId'} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={'overviewDialogA11yId'} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {OVERVIEW}
        </Text>
      </_Content>
    </MyDialog>
  );
};
