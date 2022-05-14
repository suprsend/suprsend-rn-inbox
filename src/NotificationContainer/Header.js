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
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export default function Header({
  style = {
    containerStyle: {},
    textStyle: {},
  },
}) {
  return (
    <HeaderContainer style={style.containerStyle}>
      <HeadingText style={style.textStyle}>Notifications</HeadingText>
    </HeaderContainer>
  );
}
