import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';

function Table() {
  const { data } = useContext(PlanetContext);
  const { planets, filterByName, filterByNumericValues, order } = data;

  function filterNumeric(filteredPlanets) {
    const fail = [];
    filteredPlanets.forEach((planet) => {
      filterByNumericValues
        .forEach(({ column, comparison, value }) => {
          if (planet[column] === 'unknown') fail.push(planet);
          if (comparison === 'maior que'
            && Number(planet[column]) <= value) fail.push(planet);
          if (comparison === 'menor que'
            && Number(planet[column]) >= value) fail.push(planet);
          if (comparison === 'igual a'
            && Number(planet[column]) !== value) fail.push(planet);
        });
    });
    return filteredPlanets.filter((planet) => !fail.includes(planet));
  }

  function sortAlphabetical(x, y) {
    return x.name.localeCompare(y.name);
  }

  function filterPlanets() {
    let filteredPlanets = planets
      .filter((planet) => planet.name.includes(filterByName));

    if (filterByNumericValues.length > 0) {
      filteredPlanets = filterNumeric(filteredPlanets);
    }
    if (order.sort === 'ASC') {
      return filteredPlanets
        .sort((a, b) => a[order.column] - b[order.column]);
    }
    if (order.sort === 'DESC') {
      return filteredPlanets
        .sort((a, b) => b[order.column] - a[order.column]);
    }
    console.log(filteredPlanets.sort((a, b) => a.name - b.name));

    return filteredPlanets.sort(sortAlphabetical);
  }

  function renderPlanets() {
    return filterPlanets().map((planet) => (
      <tr key={ planet.name }>
        <td data-testid="planet-name">{ planet.name }</td>
        <td>{ planet.rotation_period }</td>
        <td>{ planet.orbital_period }</td>
        <td>{ planet.diameter }</td>
        <td>{ planet.climate }</td>
        <td>{ planet.gravity }</td>
        <td>{ planet.terrain }</td>
        <td>{ planet.surface_water }</td>
        <td>{ planet.population }</td>
        <td>{ planet.films }</td>
        <td>{ planet.created }</td>
        <td>{ planet.edited }</td>
        <td>{ planet.url }</td>
      </tr>
    ));
  }

  function renderHeader() {
    const headerLabels = Object.keys(planets[0])
      .filter((label) => label !== 'residents');

    return (
      <thead>
        <tr>
          { headerLabels.map((label) => <th key={ label }>{label}</th>) }
        </tr>
      </thead>
    );
  }

  return (
    planets && (
      <table>
        { renderHeader() }
        <tbody>
          { renderPlanets() }
        </tbody>
      </table>
    )
  );
}

export default Table;
