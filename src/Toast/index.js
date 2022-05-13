import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ToastNotification, ManyNotificationsToast } from './ToastNotification';

const { height } = Dimensions.get('window');

class ToastManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  show({
    notificationData,
    notificationCount,
    storeNotificationData,
    workspaceKey,
    distinctId,
    setNotificationData,
    notify,
    toggleOpen,
  }) {
    this.setState({
      isShow: true,
      notificationData,
      notificationCount,
      otherData: {
        workspaceKey,
        distinctId,
        setNotificationData,
        storeNotificationData,
        notify,
        toggleOpen,
      },
    });
    this.isShow = true;
    if (this.props.duration !== this.props.end) {
      this.close();
    }
  }

  close(forceClose = false) {
    if (!this.isShow && !this.state.isShow) return;
    this.resetAll();
    if (!forceClose) {
      this.timer = setTimeout(() => {
        this.setState({ isShow: false });
        this.isShow = false;
      }, this.props.duration);
    } else {
      this.setState({ isShow: false });
      this.isShow = false;
    }
  }

  position() {
    if (this.props.position === 'top') return this.props.positionValue;
    if (this.props.position === 'center') return height / 2 - RFPercentage(9);
    return height - this.props.positionValue - RFPercentage(10);
  }

  resetAll = () => {
    clearTimeout(this.timer);
  };

  render() {
    if (this.state.isShow) {
      const { notificationData, notificationCount, otherData } = this.state;

      return (
        <View
          style={[
            styles.mainContainer,
            {
              top:
                Dimensions.get('window').height -
                (this.state.heightDimension || 0) -
                15,
            },
          ]}
          onLayout={(event) => {
            this.setState({
              heightDimension: event.nativeEvent.layout.height,
            });
          }}
        >
          {notificationCount > 1 ? (
            <ManyNotificationsToast
              notificationCount={notificationCount}
              otherData={otherData}
            />
          ) : (
            <ToastNotification
              notificationData={notificationData}
              otherData={otherData}
            />
          )}
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    width: Dimensions.get('window').width - 20,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
});

ToastManager.defaultProps = {
  style: {},
  position: 'bottom',
  positionValue: 50,
  end: 0,
  duration: 3000,
  animationStyle: 'rightInOut',
  hasBackdrop: false,
};

export default ToastManager;
