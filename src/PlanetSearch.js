import React from 'react';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import Order from './components/Order';
import Table from './components/Table';
import background from './assets/background.jpg';
import logo from './assets/logo.png';
import './styles/planetSearch.scss';

function PlanetSearch() {
  return (
    <div className="wrapper" style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '100% auto',
     }}>
      <img src={logo} alt="starwars logo" id="logo" />
      <NameFilter />
      <NumericFilter />
      <Order />
      <Table />
    </div> 
  );
}

export default PlanetSearch;
