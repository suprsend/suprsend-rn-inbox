import React from 'react';
import styled from '@emotion/native';
import {
  HeadingText,
  SubHeadingText,
  HelperText,
  ColorConfig,
} from '../utils/styles';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

export default function Notification({ notificationData }) {
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData;

  return (
    <Container>
      <InnerView>
        <TopView>
          <HeaderText> {message.header}</HeaderText>
          <BodyText> {message.text}</BodyText>
        </TopView>
        <BottomView>{!seenOn && <Dot />}</BottomView>
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
