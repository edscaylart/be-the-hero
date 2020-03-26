import React from "react";
import {StyleProp,ViewStyle} from 'react-native';
import { Feather } from "@expo/vector-icons";

import * as S from "./styles";
import TIncident from './incident';

type IncidentProp = {
  data: TIncident;
  showDetailButton?: boolean;
  onPress?(incident:TIncident): void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Incidents: React.FC<IncidentProp> = ({
  data,
  onPress,
  showDetailButton,
  containerStyle
}) => {
  return (
    <S.Container style={containerStyle}>
      <S.IncidentProperty>ONG:</S.IncidentProperty>
      <S.IncidentValue>{data.name}</S.IncidentValue>

      <S.IncidentProperty>CASO:</S.IncidentProperty>
      <S.IncidentValue>{data.title}</S.IncidentValue>

      <S.IncidentProperty>Valor:</S.IncidentProperty>
      <S.IncidentValue>{Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(data.value ?? 0.0)}</S.IncidentValue>

      {showDetailButton && (
        <S.DetailsButton onPress={() => onPress(data)}>
          <S.DetailsButtonText>Ver mais detalhes</S.DetailsButtonText>
          <Feather name="arrow-right" size={16} color="#e02041" />
        </S.DetailsButton>
      )}
    </S.Container>
  );
};

Incidents.defaultProps = {
  containerStyle: null,
  showDetailButton: true
};

export default Incidents;
