import React from 'react';
import { TouchableOpacity } from 'react-native';
import Notification from './Notification';

export default function ClickableNotification({ notificationData }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        console.log('notification me');
      }}
      style={{ width: '100%' }}
    >
      <Notification notificationData={notificationData} />
    </TouchableOpacity>
  );
}
