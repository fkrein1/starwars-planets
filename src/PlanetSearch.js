import React from 'react';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import Order from './components/Order';
import Table from './components/Table';

function PlanetSearch() {
  return (
    <div id="planet">
      <NameFilter />
      <NumericFilter />
      <Order />
      <Table />
    </div> 
  );
}

export default PlanetSearch;
