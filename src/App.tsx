import React from 'react';
import { Header } from './components/organisms';
import Router from './Router';

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
