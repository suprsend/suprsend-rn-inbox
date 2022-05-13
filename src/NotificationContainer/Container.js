import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled from '@emotion/native';
import NotificationList from '../Notifications/NotificationList';
import Header from './Header';

const NotificationContainerView = styled.View`
  min-height: 100px;
  max-height: 400px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  position: relative;
  border-radius: 5px;
  padding-top: 50px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px
  elevation: 8;
`;

export default function NotificationContainer({}) {
  return (
    <NotificationContainerView style={styles.container}>
      <Header />
      <NotificationList />
    </NotificationContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
});
