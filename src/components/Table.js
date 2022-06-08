import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';

function Table() {
  const { planets, nameFilter, numericFilter, order } = useContext(PlanetContext);
  const { planetsData, loading } = planets;

  function filterByNumeric(planets) {
    const fail = [];
    planets.forEach((planet) => {
      numericFilter
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
    return planets.filter((planet) => !fail.includes(planet));
  }

  function filterByName(planets) {
    return planetsData
      .filter((planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()));
  }

  function sortPlanets(planets) {
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
    return filteredAndSorted;
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
        <td>{ planet.surface_water }</td>
      </tr>
    ));
  }

  function renderHeader() {
    const labelsToExclude = ['population', 'films', 'created', 'edited', 'url', 'gravity', 'residents'];
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
    !loading && (
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
