import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import TOng from '../../constants/ongs';

import './styles.css';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [uf, setUf] = useState<string>('');

  const history = useHistory();

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const data: TOng = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response: AxiosResponse<TOng> = await api.post<TOng>('ongs', data);

      toast.success(`Seu ID de acesso: ${response.data.id}`, {
        autoClose: false,
        closeOnClick: false,
        onClose: (): void => history.push('/'),
      });
    } catch (err) {
      toast.error('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
