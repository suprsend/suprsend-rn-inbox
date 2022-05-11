import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window');

const colors = {
  default: '#fff',
  dark: '#121212',
  info: '#3498db',
  success: '#07bc0c',
  warning: '#f1c40f',
  error: '#e74c3c',
  textDefault: '#000',
  textDark: 'black',
};

class ToastManager extends Component {
  state = {
    isShow: false,
    text: '',
    barWidth: new Animated.Value(RFPercentage(32)),
    backgroundColor: colors.default,
    textColor: colors.textDefault,
    animationStyle: {
      rightInLeftOut: {
        animationIn: 'slideInRight',
        animationOut: 'slideOutLeft',
      },
      rightInOut: {
        animationIn: 'slideInRight',
        animationOut: 'slideOutRight',
      },
      fancy: {
        animationIn: 'zoomInDown',
        animationOut: 'zoomOutUp',
      },
    },
  };

  constructor(props) {
    super(props);
    ToastManager.__singletonRef = this;
  }

  static default = (text) => {
    ToastManager.__singletonRef.show(text, colors.default, colors.textDefault);
  };

  show(text = '') {
    let duration = 3000;
    this.state.barWidth.setValue(this.props.width); //reset barWidth value
    this.setState({
      isShow: true,
      duration,
      text,
    });
    this.isShow = true;
    if (duration !== this.props.end) this.close();
  }

  close() {
    let duration = this.state.duration;
    if (!this.isShow && !this.state.isShow) return;
    this.resetAll();
    this.timer = setTimeout(() => {
      this.setState({ isShow: false });
      this.isShow = false;
    }, 3000);
  }

  position() {
    if (this.props.position === 'top') return this.props.positionValue;
    return height - this.props.positionValue - RFPercentage(10);
  }

  resetAll = () => {
    clearTimeout(this.timer);
  };

  render() {
    // this.handleBar();
    return (
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        // onTouchEnd={() => this.resume()}
        // onTouchStart={() => this.pause()}
        onModalHide={() => this.resetAll()}
        style={styles.modelContainer}
        isVisible={this.state.isShow}
        hasBackdrop={false}
      >
        <View style={styles.mainContainer}>
          <Text>Hello world</Text>
        </View>
      </Modal>
    );
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    top: 0,
    height: 50,
    width: Dimensions.get('window').width - 20,
  },
});

ToastManager.defaultProps = {
  width: RFPercentage(32),
  height: RFPercentage(8.5),
  style: {},
  position: 'top',
  positionValue: 50,
  end: 0,
  duration: 3000,
  animationStyle: 'rightInOut',
  hasBackdrop: false,
  backdropColor: 'black',
  backdropOpacity: 0.5,
};

export const Toast = {
  show: ToastManager.default,
};
export default ToastManager;
