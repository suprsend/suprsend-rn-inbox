import React from 'react';
import { FlatList } from 'react-native';
import ClickableNotification from './ClickableNotification';

const notificationData = [
  {
    id: 1,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
  {
    id: 2,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
  {
    id: 3,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
  {
    id: 4,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
  {
    id: 5,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
  {
    id: 6,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
  {
    id: 7,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
  {
    id: 8,
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: '',
  },
];

export default function NotificationsList() {
  return (
    <FlatList
      data={notificationData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <ClickableNotification notificationData={item} key={item.id} />;
      }}
    />
  );
}
