import { useSetAtom } from 'jotai';
import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Overview } from './FooterContents/Overview';

const Term = lazy(() => import('./FooterContents/Term').then((module) => ({ default: module.Term })));
const Contact = lazy(() => import('./FooterContents/Inquary').then((module) => ({ default: module.Inquary })));
const Qanda = lazy(() => import('./FooterContents/Qanda').then((module) => ({ default: module.Qanda })));
const Company = lazy(() => import('./FooterContents/Company').then((module) => ({ default: module.Company })));

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = () => {
    updateDialogContent(<Term />);
  };

  const handleRequestToContactDialogOpen = () => {
    updateDialogContent(<Contact />);
  };

  const handleRequestToQuestionDialogOpen = () => {
    updateDialogContent(<Qanda />);
  };

  const handleRequestToCompanyDialogOpen = () => {
    updateDialogContent(<Company />);
  };

  const handleRequestToOverviewDialogOpen = () => {
    updateDialogContent(<Overview />);
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <Suspense fallback={null}>
            <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
              利用規約
            </_Button>
          </Suspense>
          <Suspense fallback={null}>
            <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
              お問い合わせ
            </_Button>
          </Suspense>
          <Suspense fallback={null}>
            <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
              Q&A
            </_Button>
          </Suspense>
          <Suspense fallback={null}>
            <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
              運営会社
            </_Button>
          </Suspense>
          <Suspense fallback={null}>
            <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
              Cyber TOONとは
            </_Button>
          </Suspense>
        </Flex>
      </Flex>
    </Box>
  );
};
