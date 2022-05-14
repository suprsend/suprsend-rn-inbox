import React, { useState, createContext, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { Popover } from 'react-native-popper';
import Bell from './Bell';
import Badge from './Badge';
import NotificationContainer from './NotificationContainer';
export { default as Toast } from './Toast';
import config from './config';
import { getNotifications } from './utils/api';
import useAsyncStorage from './utils/useAsyncStorage';

function processNotificationData({
  distinctId,
  workspaceKey,
  response,
  notificationData,
  setNotificationData,
  currentFetchingOn,
  notify,
  toggleOpen,
  buttonClickHandler,
}) {
  let newNotifications;
  const storageObject = {
    last_fetched: currentFetchingOn,
  };

  if (response.results.length > config.BATCH_SIZE) {
    storageObject.notifications = response.results.slice(0, config.BATCH_SIZE);
    storageObject.unread = config.BATCH_SIZE;
    newNotifications = storageObject.notifications;
  } else {
    const allNotifications = [
      ...response.results,
      ...notificationData.notifications,
    ];

    // get new notifications
    newNotifications = response.results.filter((el) => {
      return !notificationData.notifications.find((obj) => {
        return el.n_id === obj.n_id;
      });
    });

    // remove dupicates and get first 25 notifications
    const formattedNotifications = allNotifications
      .filter((v, i, a) => a.findIndex((v2) => v2.n_id === v.n_id) === i)
      .slice(0, config.BATCH_SIZE);

    // get count of unread notificationst
    const unread = formattedNotifications.reduce(
      (acc, item) => (!item.seen_on ? acc + 1 : acc),
      0
    );

    storageObject.notifications = formattedNotifications;
    storageObject.unread = unread;
  }

  if (newNotifications.length > 0) {
    notify.current.show({
      notificationCount: newNotifications.length,
      notificationData: newNotifications[0],
      storeNotificationData: storageObject,
      setNotificationData,
      workspaceKey,
      distinctId,
      notify,
      toggleOpen,
      buttonClickHandler,
    });
  }
  setNotificationData(storageObject);
}

function getNotificationsApi(
  {
    distinctId,
    workspaceKey,
    setNotificationData,
    notify,
    toggleOpen,
    buttonClickHandler,
  },
  dataRef
) {
  const notificationData = dataRef.current;
  const after = notificationData.last_fetched;
  const currentFetchingOn = Date.now();
  getNotifications({ distinctId, workspaceKey, after })
    .then((res) => res.json())
    .then((response) => {
      processNotificationData({
        distinctId,
        workspaceKey,
        response,
        notificationData,
        setNotificationData,
        currentFetchingOn,
        notify,
        toggleOpen,
        buttonClickHandler,
      });
    })
    .catch((err) => {
      console.log('GET INBOX ERROR', err);
    });
}

export const InboxContext = createContext({});

export default function SuprsendInbox({
  workspaceKey = '',
  distinctId = '',
  children,
  notify,
  bellProps,
  badgeProps,
  headerProps,
  buttonClickHandler,
}) {
  const [isOpen, toggleOpen] = useState(false);
  const [notificationData, setNotificationData] = useAsyncStorage(
    '_suprsend_inbox',
    {
      notifications: [],
      unread: 0,
      last_fetched: Date.now() - 30 * 24 * 60 * 60 * 1000,
    }
  );
  const dataRef = useRef(notificationData);

  useEffect(() => {
    const props = {
      distinctId,
      workspaceKey,
      notificationData,
      setNotificationData,
      notify,
      toggleOpen,
      buttonClickHandler,
    };
    setTimeout(() => {
      getNotificationsApi(props, dataRef);
    }, 1000);
    setInterval(() => {
      getNotificationsApi(props, dataRef);
    }, config.DELAY);
  }, []);

  useEffect(() => {
    dataRef.current = notificationData;
  }, [notificationData, notificationData.notifications]);

  const NotificationBox = children ? children : NotificationContainer;

  return (
    <InboxContext.Provider
      value={{
        distinctId,
        workspaceKey,
        notifications: notificationData.notifications,
        unread: notificationData.unread,
        setNotificationData,
        notificationData,
        toggleInbox: toggleOpen,
        buttonClickHandler,
      }}
    >
      <Container>
        <Popover
          isOpen={isOpen}
          animated={false}
          animationEntryDuration={0}
          animationExitDuration={0}
          onOpenChange={toggleOpen}
          onRequestClose={() => {
            toggleOpen(false);
          }}
          trigger={
            <MainIcon activeOpacity={0.7}>
              <Badge {...badgeProps} />
              <Bell {...bellProps} />
            </MainIcon>
          }
        >
          <Popover.Backdrop />
          <Popover.Content>
            <Popover.Arrow
              style={[
                styles.arrow,
                {
                  backgroundColor:
                    headerProps?.style?.containerStyle?.backgroundColor ||
                    'white',
                },
              ]}
            />
            <NotificationBox headerProps={headerProps} />
          </Popover.Content>
        </Popover>
      </Container>
    </InboxContext.Provider>
  );
}

const Container = styled.View`
  position: relative;
`;

const MainIcon = styled.TouchableOpacity`
  position: relative;
  padding: 10px 10px 0px 0px;
  align-self: flex-start;
`;

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
