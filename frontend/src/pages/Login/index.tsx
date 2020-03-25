import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import './styles.css';

import TOng from '../../constants/ongs';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const Login: React.FC = () => {
  const [id, setId] = useState<string>('');

  const history = useHistory();

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      const response: AxiosResponse<TOng> = await api.post<TOng>('session', {
        id,
      });
      const ong = response.data;
      localStorage.setItem('ongId', ong.id ?? '');
      localStorage.setItem('ongName', ong.name ?? '');

      history.push('/profile');
    } catch (err) {
      toast.error('Falha no login, tente novamente');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
};

export default Login;
