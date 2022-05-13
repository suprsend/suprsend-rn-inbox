import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import styled from '@emotion/native';
import { InboxContext } from '../index';
import ClickableNotification from './ClickableNotification';
import { HelperText } from '../utils/styles';

export default function NotificationsList() {
  const { notifications } = useContext(InboxContext);

  if (notifications.length <= 0) {
    return <EmptyText>No Notifications</EmptyText>;
  }
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.n_id}
      renderItem={({ item: notification, index }) => {
        return (
          <ClickableNotification notificationData={notification} key={index} />
        );
      }}
    />
  );
}

const EmptyText = styled(HelperText)`
  text-align: center;
  font-style: italic;
  margin: 20px 0px;
`;
