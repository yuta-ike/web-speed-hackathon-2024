import React from 'react';
import styled from 'styled-components';

const _Spacer = styled.div<{ $height?: number; $width?: number }>`
  flex-grow: 0;
  flex-shrink: 0;
  height: ${({ $height }) => ($height !== undefined ? `${$height}px` : '100%')};
  width: ${({ $width }) => ($width !== undefined ? `${$width}px` : '100%')};
`;

type Props = {
  height?: number;
  width?: number;
};

export const Spacer: React.FC<Props> = ({ height, width }) => {
  return <_Spacer $height={height} $width={width} />;
};
