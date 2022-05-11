import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { Popover } from 'react-native-popper';
import Bell from './Bell';
import Badge from './Badge';
import NotificationContainer from './NotificationContainer';
export { default as ToastManager } from './Toast';

const count = 5;

const Container = styled.View`
  position: relative;
`;

const MainIcon = styled.TouchableOpacity`
  position: relative;
  padding: 10px 10px 0px 0px;
  width: 30px;
`;

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
          <Popover.Arrow style={styles.arrow} />
          <NotificationBox />
        </Popover.Content>
      </Popover>
    </Container>
  );
}

const styles = StyleSheet.create({
  arrow: {
    backgroundColor: 'white',
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 0.1,
    elevation: 8,
    zIndex: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderLeftWidth: 1,
    borderLeftColor: '#f0f0f0',
  },
});
