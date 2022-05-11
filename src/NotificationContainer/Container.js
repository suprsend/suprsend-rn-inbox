import React from 'react';
import { Dimensions } from 'react-native';
import styled from '@emotion/native';
import NotificationList from '../Notifications/NotificationList';
import Header from './Header';

const NotificationContainerView = styled.View`
  min-height: 100px;
  max-height: 500px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  position: relative;
  border-radius: 5px;
  padding-top: 50px;
`;

export default function NotificationContainer({ headerProps }) {
  return (
    <NotificationContainerView
      style={{
        width: Dimensions.get('screen').width - 25,
      }}
      elevation={10}
    >
      <Header />
      <NotificationList />
    </NotificationContainerView>
  );
}
