import React from 'react';
import styled from '@emotion/native';
import {
  HeadingText,
  SubHeadingText,
  HelperText,
  ColorConfig,
} from '../utils/styles';

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

export default function Notification({ notificationData, isRead = false }) {
  return (
    <Container>
      <InnerView>
        <TopView>
          <HeaderText> {notificationData.header}</HeaderText>
          <BodyText> {notificationData.text}</BodyText>
          {notificationData.button && (
            <Button
              onPress={() => {
                console.log('button clicked');
                // redirect to notificationData.url
              }}
            >
              <ButtonText>{notificationData.button}</ButtonText>
            </Button>
          )}
        </TopView>
        <BottomView>{!isRead ? <Dot /> : null}</BottomView>
      </InnerView>
      <HelperText>Yesterday at 2:35pm</HelperText>
    </Container>
  );
}
