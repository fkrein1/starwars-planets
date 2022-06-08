import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetContext = createContext();

export function Planets({ children }) {
  const INITIAL_STATE = {
    planets: '',
    filterByName: '',
    filterByNumericValues: [],
    order: {
      column: '',
      sort: '',
    },
  };

  const [data, setData] = useState(INITIAL_STATE);

  return (
    <PlanetContext.Provider value={ { data, setData } }>
      {children}
    </PlanetContext.Provider>
  );
}

Planets.propTypes = {
  children: PropTypes.node.isRequired,
};
