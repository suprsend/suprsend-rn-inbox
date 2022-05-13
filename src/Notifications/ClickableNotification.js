import React, { useContext } from 'react';
import styled from '@emotion/native';
import Notification from './Notification';
import { markSeen } from '../utils/api';
import { uuid, epochMilliseconds } from '../utils';
import { InboxContext } from '../index';

export default function ClickableNotification({ notificationData }) {
  const {
    workspaceKey,
    setNotificationData,
    notifications,
    notificationData: storeData,
  } = useContext(InboxContext);

  const handleClick = () => {
    if (!notificationData.seen_on) {
      const body = {
        event: '$notification_clicked',
        env: workspaceKey,
        $insert_id: uuid(),
        $time: epochMilliseconds(),
        properties: { id: notificationData.id },
      };
      markSeen(workspaceKey, body)
        .then((res) => res.json())
        .then((json) => {
          console.log('RESPONSE', json);
          for (const notification of notifications) {
            if (notification.n_id === notificationData.n_id) {
              notification.seen_on = Date.now();
            }
          }
          setNotificationData({
            unread: storeData.unread - 1,
            notifications,
            last_fetched: storeData.last_fetched,
          });
        })
        .catch((err) => {
          console.log('ERROR', err);
          // -------------------- //
          for (const notification of notifications) {
            if (notification.n_id === notificationData.n_id) {
              notification.seen_on = Date.now();
            }
          }
          setNotificationData({
            unread: storeData.unread - 1,
            notifications,
            last_fetched: storeData.last_fetched,
          });
          // --------------------- //
        });
    }
  };

  return (
    <ClickableContainer activeOpacity={0.7} onPress={handleClick}>
      <Notification notificationData={notificationData} />
    </ClickableContainer>
  );
}

const ClickableContainer = styled.TouchableOpacity`
  width: 100%;
`;
