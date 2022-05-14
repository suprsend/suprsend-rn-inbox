import React from 'react';
import styled from '@emotion/native';

function Bell({ style = {}, bellComponent, ...otherProps }) {
  if (bellComponent) {
    const BellComponent = bellComponent;
    return <BellComponent {...otherProps} />;
  }
  return (
    <DefaultImage source={require('./DefaultBellIcon.png')} style={style} />
  );
}

const DefaultImage = styled.Image`
  height: 20px;
  width: 20px;
`;

export default Bell;
