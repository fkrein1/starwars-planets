import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetContext = createContext();

export function Planets({ children }) {
  const [planets, setPlanets] = useState({loading: true, planetsData: ''});
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState([]);
  const [order, setOrder] = useState({column: 'rotation_period', order: 'ASC'}) 


  useEffect(() => {
    const getPlanets = async () => {
      const apiData = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const allPlanets = await apiData.json();
      setPlanets({
        loading: false,
        planetsData: allPlanets.results,
      });
    };
    getPlanets();
  }, []);

  const context = { 
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    numericFilter,
    setNumericFilter,
    order,
    setOrder
  }

  return (
    <PlanetContext.Provider value={ context }>
      {children}
    </PlanetContext.Provider>
  );
}

Planets.propTypes = {
  children: PropTypes.node.isRequired,
};
