import React from 'react';
import styled from '@emotion/native';
import NotificationList from '../Notifications/NotificationList';
import Header from './Header';
import { Dimensions } from 'react-native';

const NotificationContainerView = styled.View`
  min-height: 100px;
  max-height: 400px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  position: relative;
  border-radius: 5px;
  padding-top: 50px;
`;

export default function NotificationContainer({}) {
  return (
    <NotificationContainerView
      elevation={10}
      style={{ width: Dimensions.get('screen').width }}
    >
      <Header />
      <NotificationList />
    </NotificationContainerView>
  );
}
