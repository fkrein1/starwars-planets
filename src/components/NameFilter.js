import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';

function NameFilter() {
  const { nameFilter, setNameFilter } = useContext(PlanetContext);

  return (
    <div>
      <input
        placeholder="Search planet"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
    </div>
  );
}

export default NameFilter;
