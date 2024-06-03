import { useState, useEffect } from 'react';
import Header from "./components/header.jsx";
import BreedsList from "./components/breedsList.jsx";
import Home from "./components/home.jsx";
import './App.sass';

function App() {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [petsData, setPetsData] = useState([]);

  return (
    <>
      <Header setPage={setPage} setOffset={setOffset} setPetsData={setPetsData}/>
      {page === 0 && <Home />}
      {(page === 1 || page === 2) && <BreedsList 
        page={page} offset={offset} setOffset={setOffset} petsData={petsData} setPetsData={setPetsData}
      />}
    </>
  );
}

export default App;
