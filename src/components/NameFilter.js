import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';
import '../styles/nameFilter.scss';

function NameFilter() {
  const { namesFilter, setNamesFilter } = useContext(PlanetContext);

  return (
    <div id="search-filter">
      <input
        placeholder="Search planet"
        value={ namesFilter }
        onChange={ (e) => setNamesFilter(e.target.value) }
      />
    </div>
  );
}

export default NameFilter;
