import React from 'react';
import styled from '@emotion/native';

const HeaderContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: #fff;
  padding: 12px;
  z-index: 1000;
  position: absolute;
  top: 0px;
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  elevation: 2;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const HeaderText = styled.Text`
  margin: 0px;
  font-weight: 600;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderText>Notifications</HeaderText>
      <HeaderText>Mark All Read</HeaderText>
    </HeaderContainer>
  );
}
