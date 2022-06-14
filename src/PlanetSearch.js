import React from 'react';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import Order from './components/Order';
import Table from './components/Table';
import background from './assets/background.jpg'
import logo from './assets/logo.png'

function PlanetSearch() {
  return (
    <div className="wrapper" style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '100% auto',
     }}>
      <header>
        <img src={logo} alt="starwars logo" id="logo" />
      </header>
      <section className="content">
        <NameFilter />
        <NumericFilter />
        <Order />
        <Table />
      </section>
    </div> 
  );
}

export default PlanetSearch;
