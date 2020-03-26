import styled from 'styled-components/native';
import Constants from "expo-constants";

export const Container = styled.View`
  flex: 1;
  padding: ${Constants.statusBarHeight + 20}px 24px 10px 24px;
`;
export const BackButton = styled.TouchableOpacity``;
export const ContactBox = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 16px;
`;
export const HeroTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #13131a;
  line-height: 30px;
`;
export const HeroDescription = styled.Text`
  font-size: 15px;
  color: #737380;
  margin-top: 16px;
`;
export const Actions = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
`;
export const ActionButton = styled.TouchableOpacity`
  background-color: ${props => props.color || '#e02041'};
  border-radius: 8px;
  height: 50px;
  width: 48%;
  align-items: center;
  justify-content: center;
`;
export const ActionText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
`;