import React from 'react';
import styled from '@emotion/native';
import { HeadingText, SubHeadingText } from '../utils/styles';
import { uuid, epochMilliseconds, OpenButtonURL } from '../utils';
import { markSeen } from '../utils/api';

export function ToastNotification({ notificationData, otherData }) {
  const { message, seen_on: seenOn, n_id } = notificationData;

  const navigateUser = () => {
    if (typeof otherData.buttonClickHandler === 'function') {
      otherData.buttonClickHandler(notificationData);
    } else {
      if (notificationData?.message?.url) {
        OpenButtonURL(notificationData.message.url);
      }
    }
  };

  const handleClick = () => {
    if (!seenOn) {
      const body = {
        event: '$notification_clicked',
        env: otherData.workspaceKey,
        $insert_id: uuid(),
        $time: epochMilliseconds(),
        properties: { id: n_id },
      };

      markSeen(otherData.workspaceKey, body)
        .then((res) => {
          if (res.status === 202) {
            for (const notification of otherData.storeNotificationData
              .notifications) {
              if (notification.n_id === n_id) {
                notification.seen_on = Date.now();
              }
            }
            otherData.setNotificationData({
              unread: otherData.storeNotificationData.unread - 1,
              notifications: otherData.storeNotificationData.notifications,
              last_fetched: otherData.storeNotificationData.last_fetched,
            });
          }
        })
        .catch((err) => {
          console.log('ERROR', err);
        })
        .finally(() => {
          navigateUser();
        });
    }
  };

  return (
    <Container onPress={handleClick}>
      <HeaderText>{message.header}</HeaderText>
      <BodyText>{message.text}</BodyText>
    </Container>
  );
}

export function ManyNotificationsToast({ notificationCount, otherData }) {
  return (
    <ClickableNotification
      onPress={() => {
        otherData.toggleOpen(true);
        otherData.notify.current.close(true);
      }}
    >
      <MultipleToastContainer>{`You have ${notificationCount} new notifications`}</MultipleToastContainer>
    </ClickableNotification>
  );
}

const ClickableNotification = styled.TouchableOpacity``;

const MultipleToastContainer = styled(SubHeadingText)`
  padding: 20px 30px;
  border-radius: 5px;
`;

const Container = styled.TouchableOpacity`
  padding: 7px 14px;
  border-radius: 5px;
`;

const HeaderText = styled(HeadingText)`
  margin: 5px 0px;
`;

const BodyText = styled(SubHeadingText)`
  margin: 5px 0px;
`;
