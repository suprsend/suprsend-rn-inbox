import React, { useContext } from 'react';
import styled from '@emotion/native';
import Notification from './Notification';
import { markSeen } from '../utils/api';
import { uuid, epochMilliseconds, OpenButtonURL } from '../utils';
import { InboxContext } from '../index';

export default function ClickableNotification({ notificationData }) {
  const {
    workspaceKey,
    setNotificationData,
    notifications,
    notificationData: storeData,
    buttonClickHandler,
  } = useContext(InboxContext);

  const navigateUser = () => {
    // redirect after mark seen logic
    if (typeof buttonClickHandler === 'function') {
      buttonClickHandler(notificationData);
    } else {
      if (notificationData?.message?.url) {
        OpenButtonURL(notificationData.message.url);
      }
    }
  };

  const handleClick = () => {
    if (!notificationData.seen_on) {
      const body = {
        event: '$notification_clicked',
        env: workspaceKey,
        $insert_id: uuid(),
        $time: epochMilliseconds(),
        properties: { id: notificationData.n_id },
      };
      markSeen(workspaceKey, body)
        .then((res) => {
          if (res.status === 202) {
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
          }
        })
        .catch((err) => {
          console.log('MARK SEEN ERROR ', err);
        })
        .finally(() => {
          navigateUser();
        });
    } else {
      navigateUser();
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
