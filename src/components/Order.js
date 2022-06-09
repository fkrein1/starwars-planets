import React, { useContext } from 'react';
import { PlanetContext } from '../contexts/PlanetContext';

function Order() {
  const { order, setOrder } = useContext(PlanetContext);

  function handleChange({ target }) {
    setOrder({ ...order, [target.name]: target.value });
  }

  return (
    <form>
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
    </form>
  );
}

export default Order;
