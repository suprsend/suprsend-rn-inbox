import React, { useContext } from 'react';
import { InboxContext } from '../index';
import styled from '@emotion/native';
import { HelperText } from '../utils/styles';

export default function Badge({ badgeComponent, ...otherProps }) {
  const { unread: count } = useContext(InboxContext);

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

const Container = styled.View`
  position: absolute;
  top: 0px;
  right: 2px;
  padding: 2px 6px;
  background-color: red;
  border-radius: 50px;
  z-index: 999;
`;

const CountText = styled(HelperText)`
  font-size: 10px;
  color: #fff;
  line-height: 12px;
`;
