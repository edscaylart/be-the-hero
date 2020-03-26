import styled from "styled-components/native";
import Constants from 'expo-constants';

export const Container = styled.View`
  flex: 1;
  padding: ${Constants.statusBarHeight + 20}px 24px 10px 24px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Img = styled.Image``;
export const TotalText = styled.Text`
  font-size: 15px;
  color: #737380;
`;
export const TotalCase = styled.Text`
  font-weight: bold;
`;
export const Title = styled.Text`
  font-size: 30px;
  margin-bottom: 16px;
  margin-top: 48px;
  color: #13131a;
  font-weight: bold;
`;
export const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #737380;
`;

export const IncidentList = styled.FlatList`
  margin-top: 32px;
`;