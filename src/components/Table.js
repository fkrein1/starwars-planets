import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';

function Table() {
  const { planets, nameFilter, numericFilter, order } = useContext(PlanetContext);
  const { planetsData, loading } = planets;
  const labelsToExclude = ['population', 'films', 'created', 'edited', 'url', 'gravity', 'residents', 'surface_water'] ;
  const planetsToExclude = ['Aleen Minor', 'unknown', 'Troiken', 'Tholoth', 'Quermia', 'Stewjon', 'Tund', 'Glee Anselm']


  function filterByNumeric(planets) {
    return numericFilter.reduce((acc, filter) => {
      return acc.filter((planet) => {
        switch (filter.comparison) {
          case 'maior que':
            return planet[filter.column] > filter.value
          case 'menor que':
            return planet[filter.column] < filter.value
          case 'igual':
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
    if (order.order === 'ASC' && order.column === 'name') {
      return planets.sort(alphabetical);
    }
    if (order.order === 'DESC' && order.column === 'name') {
      return planets.sort(inverseAlphabetical);
    }
    if (order.order === 'ASC') {
      return planets.sort((a, b) => a[order.column] - b[order.column]);
    }
    if (order.order === 'DESC') {
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
    return combinedFilters().map((planet) => (
      <tr key={ planet.name }>
        <td>{ planet.name }</td>
        <td>{ planet.rotation_period }</td>
        <td>{ planet.orbital_period }</td>
        <td>{ planet.diameter }</td>
        <td>{ planet.climate }</td>
        <td>{ planet.terrain }</td>
      </tr>
    ));
  }

  function renderHeader() {
    const headerLabels = Object.keys(planetsData[0])
      .filter((label) => !labelsToExclude.includes(label));
    return (
      <thead>
        <tr>
          { headerLabels.map((label) => <th key={ label }>{label}</th>) }
        </tr>
      </thead>
    );
  }

  return (
    <div>
      { loading && <p>loading</p> }
      { !loading && (
        <table>
          { renderHeader() }
          <tbody>
            { renderPlanets() }
          </tbody>
        </table>
     )}
    </div>
  );
}

export default Table;
