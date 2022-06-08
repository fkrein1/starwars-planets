import React from 'react';
import { Planets } from './contexts/PlanetContext';
import PlanetSearch from './pages/PlanetSearch';

function App() {
  return (
    <Planets>
      <PlanetSearch />
    </Planets>
  );
}

export default App;
