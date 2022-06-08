import React, { useContext, useState } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';

function NumericFilter() {
  const { numericFilter, setNumericFilter } = useContext(PlanetContext);
  const [column, setColumn] = useState('rotation_period')
  const [comparison, setComparison] = useState('greater than')
  const [value, setValue] = useState(0)
  const [options, setOptions] = useState(['rotation_period', 'orbital_period', 'diameter'])

  function addFilter() {
    const newFilter = { column, comparison, value: Number(value) };
    setNumericFilter((prevState) => [...prevState, newFilter]);
  }

  function resetForm() {
    const newOptions = options.filter((option) => option !== column);
    setOptions(newOptions);
    setColumn(newOptions[0]);
    setComparison('greather than');
    setValue(0);
  }

  function handleFilter() {
    addFilter();
    resetForm();
  }

  function renderOptions() {
    return options.map((option) => (
      <option key={ option } value={ option }>{ option }</option>
    ));
  }

  function deleteFilter(columnName) {
    const newFilters = numericFilter.filter(({ column }) => column !== columnName);
    console.log(newFilters)
    setNumericFilter([...newFilters]);
    setOptions((prevState) => [...prevState, columnName]);
  }

  function deleteAllFilters() {
    setNumericFilter([]);
    setOptions(['rotation_period', 'orbital_period', 'diameter']);
  }

  function renderActiveFilters() {
    return numericFilter
      .map(({ column, comparison, value }) => (
        <div key={ column }>
          <span>{`${column} ${comparison} ${value}`}</span>
          <button
            type="button"
            onClick={ () => deleteFilter(column) }
          >
            Excluir
          </button>
        </div>
      ));
  }

  return (
    <div>
      <form>
        <select
          onChange={ (e) => setColumn(e.target.value) }
          name="column"
          value={ column }
        >
          { renderOptions() }
        </select>
        <select
          onChange={ (e) => setComparison(e.target.value) }
          name="comparison"
          value={ comparison }
        >
          <option value="greater than">greater than</option>
          <option value="less than">less than</option>
          <option value="equal to">equal to</option>
        </select>
        <input
          placeholder="value"
          type="number"
          name="value"
          onChange={ (e) => setValue(Number(e.target.value)) }
          value={ value }
        />
        <button
          type="button"
          onClick={ handleFilter }
        >
          Filter
        </button>
        <button
          type="button"
          onClick={ deleteAllFilters }
        >
          Remove Filter
        </button>
      </form>
      { renderActiveFilters() }
    </div>
  );
}

export default NumericFilter;
