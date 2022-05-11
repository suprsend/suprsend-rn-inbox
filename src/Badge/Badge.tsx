import React from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  font-size: 10px;
  position: absolute;
  padding: 3px 6px;
  background-color: gray;
  text-align: center;
  border-radius: 50px;
`;

const CountText = styled.Text`
  color: white;
`;

export default function Badge({ count, badgeComponent, ...otherProps }) {
  if (count > 0) {
    if (badgeComponent) {
      const BadgeComponent = badgeComponent;
      return <BadgeComponent count={count} {...otherProps} />;
    }
    return (
      <Container>
        <CountText>{count}</CountText>
      </Container>
    );
  }
  return null;
}
