import React, { useMemo } from 'react';
import {Linking} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from 'expo-mail-composer';

import * as S from './styles'; 

import Header from "../../components/Header";
import Incident from "../../components/Incident";
import TIncident from "../../components/Incident/incident";

interface RouteType {
  params: {
    incident: TIncident
  }
}

type DetailParam = {
  route: RouteType
}

const Detail: React.FC<DetailParam> = ({ route }) => {
  const navigation = useNavigation();
  const { incident } = route.params;

  const message = useMemo(() => {
    return `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de R$ ${incident.value}`;
  }, [incident])

  function handleBack(): void {
    navigation.goBack();
  }

  function sendMail(): void {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp(): void {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <S.Container>
      <Header>
        <S.BackButton onPress={handleBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </S.BackButton>
      </Header>

      <Incident
        containerStyle={{ marginTop: 48 }}
        data={incident}
        showDetailButton={false}
      />

      <S.ContactBox>
        <S.HeroTitle>Salve o dia!</S.HeroTitle>
        <S.HeroTitle>Seja o herói desse cacso.</S.HeroTitle>

        <S.HeroDescription>Entre em contato:</S.HeroDescription>

        <S.Actions>
          <S.ActionButton onPress={sendWhatsapp}>
            <S.ActionText>WhatsApp</S.ActionText>
          </S.ActionButton>
          <S.ActionButton onPress={sendMail}>
            <S.ActionText>E-mail</S.ActionText>
          </S.ActionButton>
        </S.Actions>
      </S.ContactBox>
    </S.Container>
  );
}

export default Detail;
