import React from 'react';

import { Header } from './components/Header';
import Router from './Router';
import './assets/reset.css';
import './assets/style.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
