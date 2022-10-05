import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';
import '../styles/nameFilter.scss';

function NameFilter() {
  const { nameFilter, setNameFilter } = useContext(PlanetContext);

  return (
    <div id="search-filter">
      <input
        placeholder="Search planet"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
    </div>
  );
}

export default NameFilter;
