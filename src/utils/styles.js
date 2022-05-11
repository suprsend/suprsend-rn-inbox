import styled from '@emotion/native';

export const ColorConfig = {
  primary: '#000000',
  secondary: '#358adf',
  tertiary: '',
  white: '#ffffff',
  lightGray1: '#707070',
  lightGray2: '#f0f0f0',
};

export const CText = styled.Text`
  font-size: 14px;
  color: ${ColorConfig.primary};
  font-weight: 400;
  margin: 0px;
`;

export const HeadingText = styled(CText)`
  font-size: 16px;
  font-weight: 600;
`;

export const SubHeadingText = styled(CText)``;

export const HelperText = styled(CText)`
  font-size: 12px;
  color: ${ColorConfig.lightGray1};
`;
