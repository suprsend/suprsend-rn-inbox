import * as React from 'react';
import { View } from 'react-native';
import Inbox, { ToastManager } from '@suprsend/rn-inbox';

export default function App() {
  return (
    <View>
      <ToastManager />
      <Inbox />
    </View>
  );
}
