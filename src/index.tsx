import React, { useState } from 'react';
import styled from '@emotion/native';
import { Popover } from 'react-native-popper';
import Bell from './Bell';
import Badge from './Badge';
import NotificationContainer from './NotificationContainer';
export { default as ToastManager } from './Toast';
import { Toast } from './Toast';

const count = 5;

const Container = styled.View`
  position: relative;
  margin-top: 50px;
  margin-left: 20px;
`;

const MainIcon = styled.TouchableOpacity``;

export default function SuprsendInbox({ children }) {
  const [isOpen, toggleOpen] = useState(false);

  const NotificationBox = children ? children : NotificationContainer;
  return (
    <Container>
      <Popover
        isOpen={isOpen}
        animationEntryDuration={10}
        animationExitDuration={10}
        onOpenChange={toggleOpen}
        onRequestClose={() => {
          toggleOpen(false);
        }}
        trigger={
          <MainIcon activeOpacity={0.7}>
            <Badge count={count} />
            <Bell />
          </MainIcon>
        }
      >
        <Popover.Backdrop />
        <Popover.Content>
          <Popover.Arrow
            style={{
              backgroundColor: 'white',
              borderColor: '#fff',
              elevation: 10,
              zIndex: 10,
            }}
          />
          <NotificationBox />
        </Popover.Content>
      </Popover>
    </Container>
  );
}
