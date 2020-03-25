import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import Lottie from '../Lottie';

import TIncident from '../../constants/incidents';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

const Profile: React.FC = () => {
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [incidents, setIncidents] = useState<TIncident[]>([]);

  useEffect(() => {
    async function loadIncidents(): Promise<void> {
      try {
        const response: AxiosResponse<TIncident[]> = await api.get<TIncident[]>(
          'profile',
          {
            headers: {
              Authorization: ongId,
            },
          }
        );
        setIncidents(response.data);
      } catch (err) {
        toast.error('Falha ao carregar os casos');
      }
      setLoading(false);
    }

    setLoading(true);
    setTimeout(() => {
      loadIncidents();
    }, 3000);
  }, [ongId]);

  async function handleDeleteIncident(id: number): Promise<void> {
    setLoading(true);
    try {
      await api.delete(`incidents/${id}`);
      setIncidents(incidents.filter((i) => i.id !== id));
    } catch (err) {
      toast.error('Falha ao carregar os casos');
    }
    setLoading(false);
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>{`Bem vinda, ${ongName}`}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      {loading ? (
        <div className="loading">
          <Lottie />
        </div>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident?.id}>
              <strong>CASO:</strong>
              <p>{incident?.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident?.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(incident?.value ?? 0.0)}
              </p>

              <button
                type="button"
                onClick={() => handleDeleteIncident(incident?.id ?? 0)}
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
