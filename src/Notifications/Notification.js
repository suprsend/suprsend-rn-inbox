import React, { useState } from 'react';
import { Pressable, Image } from 'react-native';
import styled from '@emotion/native';
import { Popover } from 'react-native-popper';

const Container = styled.View`
  padding: 7px 14px;
  border-radius: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const InnerView = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const TopView = styled.View`
  margin-right: 15px;
  flex: 1;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  margin: 5px 0px;
`;

const BodyText = styled.Text`
  font-size: 14px;
  margin: 5px 0px;
`;

const Button = styled.TouchableOpacity`
  background-color: #358adf;
  border-radius: 5px;
  margin: 10px 0px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  padding: 1px 0px;
  text-align: center;
`;

const BottomView = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Dot = styled.View`
  margin-left: 10px;
  background: #358adf;
  border-radius: 50px;
  width: 6px;
  height: 6px;
`;

const UnReadView = styled.Pressable`
  position: relative;
`;

const MenuItemText = styled.Text`
  font-size: 12px;
  padding: 12px;
  width: 100%;
  margin: 0px;
`;

const MenuBox = styled.View`
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2),
    0px 6px 20px 0px rgba(0, 0, 0, 0.19);
`;

const TimeText = styled.Text`
  font-size: 12px;
  margin: 0px;
  color: #2c394b;
`;

export default function Notification({ notificationData, isRead = true }) {
  const [openMenu, toggleMenu] = useState(false);
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
        <BottomView>
          {!isRead ? (
            <Dot />
          ) : (
            <UnReadView>
              <Popover
                animationEntryDuration={0}
                animationExitDuration={0}
                isOpen={openMenu}
                onOpenChange={toggleMenu}
                placement="left top"
                trigger={
                  <Pressable>
                    <Image source={require('./MenuIcon.png')} />
                  </Pressable>
                }
              >
                <Popover.Backdrop />
                <Popover.Content>
                  <MenuBox
                    onPress={() => {
                      toggleMenu((prev) => !prev);
                    }}
                  >
                    <MenuItemText>UnRead</MenuItemText>
                  </MenuBox>
                </Popover.Content>
              </Popover>
            </UnReadView>
          )}
        </BottomView>
      </InnerView>
      <TimeText>Yesterday at 2:35pm</TimeText>
    </Container>
  );
}
