import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { InboxContext } from '../index';
import ClickableNotification from './ClickableNotification';

export default function NotificationsList() {
  const { notifications } = useContext(InboxContext);

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
