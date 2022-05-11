import React from 'react';
import styled from '@emotion/native';
import { HeadingText, ColorConfig } from '../utils/styles';

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0px;
  background-color: ${ColorConfig.white};
  padding: 12px;
  z-index: 1000;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  elevation: 2;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeadingText>Notifications</HeadingText>
    </HeaderContainer>
  );
}
