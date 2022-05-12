import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from '@emotion/native';
import { HeadingText, SubHeadingText, ColorConfig } from '../utils/styles';

const { height } = Dimensions.get('window');

const Container = styled.View`
  padding: 7px 14px;
  border-radius: 5px;
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

class ToastManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  show(notificationData) {
    this.setState({
      isShow: true,
      notificationData,
    });
    this.isShow = true;
    if (this.props.duration !== this.props.end) {
      this.close();
    }
  }

  close() {
    if (!this.isShow && !this.state.isShow) return;
    this.resetAll();
    this.timer = setTimeout(() => {
      this.setState({ isShow: false });
      this.isShow = false;
    }, this.props.duration);
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
      return (
        <View
          style={[
            styles.mainContainer,
            {
              top:
                Dimensions.get('screen').height -
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
          <Container>
            <HeaderText>{this.state.notificationData?.header}</HeaderText>
            <BodyText>{this.state.notificationData?.text}</BodyText>
            {this.state.notificationData?.button && (
              <Button
                onPress={() => {
                  console.log('button clicked');
                  // redirect to notificationData.url
                }}
              >
                <ButtonText>{this.state.notificationData.button}</ButtonText>
              </Button>
            )}
          </Container>
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
