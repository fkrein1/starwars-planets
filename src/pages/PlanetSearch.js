import React, { useContext, useEffect, useState } from 'react';
import Table from '../components/Table';
import { PlanetContext } from '../contexts/PlanetContext';

function PlanetSearch() {
  const { data, setData } = useContext(PlanetContext);
  const [form, setForm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
    columnOptions: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    columnSort: 'population',
    order: 'ASC',
  });

  useEffect(() => {
    const getPlanets = async () => {
      const apiData = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const allPlanets = await apiData.json();
      setData({
        ...data,
        planets: allPlanets.results,
      });
    };
    getPlanets();
  }, []);

  function filterByName({ target }) {
    setData({ ...data, filterByName: target.value });
  }

  function filterByNumericValues() {
    const { column, comparison, value } = form;
    const newFilter = { column, comparison, value: Number(value) };
    setData({
      ...data,
      filterByNumericValues: [...data.filterByNumericValues, newFilter],
    });
  }

  function removeOption() {
    const newOptions = form.columnOptions
      .filter((option) => option !== form.column);

    setForm({ ...form, columnOptions: newOptions, column: newOptions[0], value: 0 });
  }

  function handleFilterBtnClick() {
    filterByNumericValues();
    removeOption();
  }

  function handleChange({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function renderOptions() {
    return form.columnOptions.map((option) => (
      <option key={ option } value={ option }>{ option }</option>
    ));
  }

  function deleteFilter(columnName) {
    const newFilter = data.filterByNumericValues
      .filter(({ column }) => column !== columnName);
    setData({ ...data, filterByNumericValues: newFilter });
    setForm((prevState) => ({
      ...form,
      columnOptions: [...prevState.columnOptions, columnName],
    }));
  }

  function deleteAllFilters() {
    setData({ ...data, filterByNumericValues: [] });
    setForm({
      ...form,
      columnOptions: [
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ],
    });
  }

  function renderActiveFilters() {
    return data.filterByNumericValues
      .map(({ column, comparison, value }) => (
        <div key={ column } data-testid="filter">
          <p>{`${column} ${comparison} ${value}`}</p>
          <button
            type="button"
            onClick={ () => deleteFilter(column) }
          >
            Excluir
          </button>
        </div>
      ));
  }

  function sortColumn() {
    setData({ ...data, order: { column: form.columnSort, sort: form.order } });
  }

  return (
    <div>
      <input
        placeholder="search"
        data-testid="name-filter"
        value={ data.filterByName }
        onChange={ filterByName }
      />
      <form>
        <select
          data-testid="column-filter"
          onChange={ handleChange }
          name="column"
          value={ form.column }
        >
          { renderOptions() }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ handleChange }
          name="comparison"
          value={ form.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          placeholder="value"
          type="number"
          name="value"
          onChange={ handleChange }
          value={ form.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterBtnClick }
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ deleteAllFilters }
        >
          Remover Filtros
        </button>

      </form>
      <form>
        <select
          data-testid="column-sort"
          onChange={ handleChange }
          name="columnSort"
          value={ form.columnSort }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="ASC">
          Ascedente
          <input
            type="radio"
            id="ASC"
            name="order"
            value="ASC"
            data-testid="column-sort-input-asc"
            checked={ form.order === 'ASC' }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            id="DESC"
            name="order"
            value="DESC"
            data-testid="column-sort-input-desc"
            checked={ form.order === 'DESC' }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ sortColumn }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </form>
      { renderActiveFilters() }
      <Table />
    </div>
  );
}

export default PlanetSearch;
