import * as React from 'react';
import { View, Text } from 'react-native';
import Inbox, { ToastManager } from '@suprsend/rn-inbox';

export default function App() {
  return (
    <View style={{ alignItems: 'flex-end' }}>
      <ToastManager />
      <Inbox />
    </View>
  );
}
