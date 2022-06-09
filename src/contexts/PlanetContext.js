import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetContext = createContext();

export function Planets({ children }) {
  const [planets, setPlanets] = useState({loading: true, planetsData: []});
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState([]);
  const [order, setOrder] = useState({column: 'name', type: 'ASC'}) 


  useEffect(() => {
    const getPlanets = async () => {
      const [api01, api02, api03, api04, api05] = await Promise.all([
        fetch("https://swapi-trybe.herokuapp.com/api/planets/"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=2"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=3"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=4"),
        fetch("https://swapi-trybe.herokuapp.com/api/planets/?page=5"),
      ]);

      const [planet01, planet02, planet03, planet04, planet05] = await Promise
        .all([api01.json(), api02.json(), api03.json(), api04.json(), api05.json()]);
    
      const allPlanets = [
        ...planet01.results,
        ...planet02.results, 
        ...planet03.results,
        ...planet04.results,
        ...planet05.results,
      ]
      setPlanets({
        loading: false,
        planetsData: allPlanets,
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
