import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import { AxiosResponse } from 'axios';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import TIncident from '../../constants/incidents';

import './styles.css';

const NewIncident: React.FC = () => {
  const history = useHistory();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<number>(0);

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const data: TIncident = {
      title,
      description,
      value,
    };

    try {
      await api.post<TIncident>('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });
      toast.success(`Novo caso registrado!`);
      history.push('/profile');
    } catch (err) {
      toast.error('Erro no cadastrar novo caso');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
