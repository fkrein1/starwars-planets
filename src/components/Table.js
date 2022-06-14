import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';
import { planetImages } from '../assets/planetImages.js'

function Table() {
  const { planets, nameFilter, numericFilter, order } = useContext(PlanetContext);
  const { planetsData, loading } = planets;
  const planetsToExclude = ['Aleen Minor', 'unknown', 'Troiken', 'Tholoth', 'Quermia', 'Stewjon', 'Tund', 'Glee Anselm']


  function filterByNumeric(planets) {
    return numericFilter.reduce((acc, filter) => {
      return acc.filter((planet) => {
        switch (filter.comparison) {
          case 'greater than':
            return planet[filter.column] > filter.value
          case 'less than':
            return planet[filter.column] < filter.value
          case 'equal to':
            return planet[filter.column] === filter.value
          default:
           return true
        }
      })
    }, planets)
  }

  function filterByName(planets) {
    return planets
      .filter((planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }

  function alphabetical(x, y) {
    return x.name.localeCompare(y.name);
  }

  function inverseAlphabetical(x, y) {
    return y.name.localeCompare(x.name);
  }

  function sortPlanets(planets) {
    if (order.type === 'ASC' && order.column === 'name') {
      return planets.sort(alphabetical);
    }
    if (order.type === 'DESC' && order.column === 'name') {
      return planets.sort(inverseAlphabetical);
    }
    if (order.type === 'ASC') {
      return planets.sort((a, b) => a[order.column] - b[order.column]);
    }
    if (order.type === 'DESC') {
      return planets.sort((a, b) => b[order.column] - a[order.column]);
    }
  }

  function combinedFilters() {
    const filteredByName = filterByName(planetsData);
    const filteredByNumeric = filterByNumeric(filteredByName);
    const filteredAndSorted = sortPlanets(filteredByNumeric);
    return filteredAndSorted.filter((planet) => !planetsToExclude.includes(planet.name));
  }

  function renderPlanets() {
    return combinedFilters().map((planet, index) => (
      <div key={ planet.name } className="planet">
        <p>{index + 1 }</p>
        <img src={planetImages.find(img => img.planet === planet.name).image} alt={planet.name} />
        <p>{ planet.name }</p>
        <p>{ planet.rotation_period }</p>
        <p>{ planet.orbital_period }</p>
        <p>{ planet.diameter }</p>
        <p>{ planet.terrain }</p>
      </div>
    ));
  }

  return (
    <div>
      { loading && <p>loading</p> }
      { !loading && (
        renderPlanets()
     )}
    </div>
  );
}

export default Table;
