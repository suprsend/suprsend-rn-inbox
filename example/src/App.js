import * as React from 'react';
import { View } from 'react-native';
import Inbox, { Toast } from '@suprsend/rn-inbox';

export default function App() {
  const myRef = React.useRef();
  return (
    <View>
      <Toast ref={myRef} />
      <View style={{ marginTop: 50 }}>
        <Inbox
          notify={myRef}
          distinctId="katta.sivaram@suprsend.com"
          workspaceKey="kfWdrPL1nFqs7OUihiBn"
          // buttonClickHandler={(notificationData) => {
          //   console.log('clicked me', notificationData);
          // }}
        />
      </View>
    </View>
  );
}
