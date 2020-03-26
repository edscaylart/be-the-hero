import React, { useState, useEffect } from "react";
import {useNavigation} from '@react-navigation/native';
import { AxiosResponse } from "axios";

import * as S from "./styles";

import Header from "../../components/Header";
import Incident from '../../components/Incident';
import TIncident from "../../components/Incident/incident";
import api from "../../services/api";

const Incidents: React.FC = () => {
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState<TIncident[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  async function loadIncidents(): Promise<void> {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;

    setLoading(true);
    try {
      const response: AxiosResponse<TIncident[]> = await api.get<TIncident[]>(
        `incidents?page=${page}`
      );
      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers["x-total-count"]);
      setPage(page + 1);
    } catch (err) {}
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident: TIncident): void {
    navigation.navigate("Detail", { incident });
  }

  return (
    <S.Container>
      <Header>
        <S.TotalText>
          Total de <S.TotalCase>{total} casos</S.TotalCase>
        </S.TotalText>
      </Header>

      <S.Title>Bem-vindo!</S.Title>
      <S.Description>Escolha um dos casos abaixo e salve o dia</S.Description>

      <S.IncidentList
        showVerticalScrollIndicator={false}
        data={incidents}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Incident data={item} onPress={navigateToDetail} />
        )}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
      />
    </S.Container>
  );
};

export default Incidents;
