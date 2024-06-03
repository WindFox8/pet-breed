import { useState } from 'react';
import '../styles/header.sass';

function Header({ setPage, setOffset, setPetsData}) {
  const handleNavClick = (key) => {
    setPage(key);
    setOffset(0);
    setPetsData([]);
  };

  return (
    <header>
      <div>
        <img src="./src/assets/paw.svg" alt="paw" />
        <h4>Pets Breeds</h4>
      </div>
      <ul>
        <li onClick={() => handleNavClick(0)}>Home</li>
        <li onClick={() => handleNavClick(1)}>Dogs</li>
        <li onClick={() => handleNavClick(2)}>Cats</li>
        <li><img src="./src/assets/glass.svg" alt="glass" /></li>
      </ul>
    </header>
  );
}

export default Header;
