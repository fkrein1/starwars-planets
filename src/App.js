import React from 'react';
import { Planets } from './contexts/PlanetContext';
import PlanetSearch from './PlanetSearch';
import './App.scss';

function App() {
  return (
    <Planets>
      <PlanetSearch />
    </Planets>
  );
}

export default App;
