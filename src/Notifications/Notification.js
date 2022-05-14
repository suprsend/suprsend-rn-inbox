import React, { useContext } from 'react';
import styled from '@emotion/native';
import {
  HeadingText,
  SubHeadingText,
  HelperText,
  ColorConfig,
} from '../utils/styles';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { InboxContext } from '../index';
import { markSeen } from '../utils/api';
import { uuid, epochMilliseconds, OpenButtonURL } from '../utils';

dayjs.extend(calendar);

export default function Notification({ notificationData }) {
  const {
    workspaceKey,
    setNotificationData,
    notifications,
    notificationData: storeData,
    buttonClickHandler,
  } = useContext(InboxContext);

  const {
    message,
    seen_on: seenOn,
    created_on: createdOn,
    n_id,
  } = notificationData;

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
    if (!seenOn) {
      const body = {
        event: '$notification_clicked',
        env: workspaceKey,
        $insert_id: uuid(),
        $time: epochMilliseconds(),
        properties: { id: n_id },
      };
      markSeen(workspaceKey, body)
        .then((res) => {
          if (res.status === 202) {
            for (const notification of notifications) {
              if (notification.n_id === n_id) {
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
    <Container>
      <InnerView>
        <TopView>
          <HeaderText> {message.header}</HeaderText>
          <BodyText> {message.text}</BodyText>
          {message.button && (
            <Button onPress={handleClick}>
              <ButtonText>{message.button}</ButtonText>
            </Button>
          )}
        </TopView>
        <BottomView>{!seenOn ? <Dot /> : null}</BottomView>
      </InnerView>
      <HelperText>
        {dayjs(createdOn).calendar(null, {
          sameDay: '[Today at] h:mm A',
          nextDay: '[Tomorrow at] h:mm A',
          nextWeek: 'dddd [at] h:mm A',
          lastDay: '[Yesterday at] h:mm A',
          lastWeek: '[Last] dddd [at] h:mm A',
          sameElse: 'DD/MM/YYYY [at] h:mm A',
        })}
      </HelperText>
    </Container>
  );
}

const Container = styled.View`
  padding: 7px 14px;
  border-radius: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${ColorConfig.lightGray2}; ;
`;

const InnerView = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
`;

const TopView = styled.View`
  flex: 1;
  margin-right: 15px;
`;

const HeaderText = styled(HeadingText)`
  margin: 5px 0px;
`;

const BodyText = styled(SubHeadingText)`
  margin: 5px 0px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${ColorConfig.secondary};
  border-radius: 5px;
  margin: 10px 0px;
  padding: 2px 0px;
`;

const ButtonText = styled(SubHeadingText)`
  color: ${ColorConfig.white};
  padding: 1px 0px;
  text-align: center;
`;

const BottomView = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 14px;
`;

const Dot = styled.View`
  width: 6px;
  height: 6px;
  background: ${ColorConfig.secondary};
  margin-left: 10px;
  border-radius: 50px;
`;
