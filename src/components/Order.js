import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';
import '../styles/order.scss';


function Order() {
  const { order, setOrder } = useContext(PlanetContext);

  function handleChange({ target }) {
    setOrder({ ...order, [target.name]: target.value });
  }

  return (
    <form id="sort-filter">
      <select
        onChange={ handleChange }
        name="column"
        value={ order.column }
      >
        <option value="name">name</option> 
        <option value="rotation_period">rotation_period</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
      </select>
      <div id="sort-labels">
        <label htmlFor="ASC">
          ASC
          <input
            type="radio"
            name="type"
            value="ASC"
            checked={ order.type === 'ASC' }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="DESC">
          DESC
          <input
            type="radio"
            name="type"
            value="DESC"
            checked={ order.type === 'DESC' }
            onChange={ handleChange }
          />
        </label>
      </div>
    </form>
  );
}

export default Order;
