import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <div>
      <Routes />
      <ToastContainer />
    </div>
  );
};

export default App;
