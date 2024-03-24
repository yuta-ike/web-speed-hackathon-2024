import React, { lazy, Suspense, useEffect, useState, useTransition } from 'react';
import styled from 'styled-components';

import { Color, Space } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Overview } from './FooterContents/Overview';
import { Term } from './FooterContents/Term';

const Contact = lazy(() => import('./FooterContents/Inquary').then((module) => ({ default: module.Inquary })));
const Qanda = lazy(() => import('./FooterContents/Qanda').then((module) => ({ default: module.Qanda })));
const Company = lazy(() => import('./FooterContents/Company').then((module) => ({ default: module.Company })));

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  const [showTerm, setShowTerm] = useState(false);
  const [showInquary, setShowInquary] = useState(false);
  const [showQanda, setShowQanda] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const handleRequestToTermDialogOpen = () => {
    startTransition(() => {
      setShowTerm(true);
    });
  };

  const handleRequestToContactDialogOpen = () => {
    startTransition(() => {
      setShowInquary(true);
    });
  };

  const handleRequestToQuestionDialogOpen = () => {
    startTransition(() => {
      setShowQanda(true);
    });
  };

  const handleRequestToCompanyDialogOpen = () => {
    startTransition(() => {
      setShowCompany(true);
    });
  };

  const handleRequestToOverviewDialogOpen = () => {
    startTransition(() => {
      setShowOverview(true);
    });
  };

  return (
    <>
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
      {showTerm && <Term open onClose={() => setShowTerm(false)} />}
      {showInquary && <Contact open onClose={() => setShowInquary(false)} />}
      {showQanda && <Qanda open onClose={() => setShowQanda(false)} />}
      {showCompany && <Company open onClose={() => setShowCompany(false)} />}
      {showOverview && <Overview open onClose={() => setShowOverview(false)} />}
    </>
  );
};
