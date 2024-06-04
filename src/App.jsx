import { useState, useEffect } from 'react';
import Header from "./components/header.jsx";
import BreedsList from "./components/breedsList.jsx";
import Home from "./components/home.jsx";
import BreedInfo from "./components/breedInfo.jsx";
import './App.sass';

function App() {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [petsData, setPetsData] = useState([]);
  const [petBreed, setPetBreed] = useState({});

  useEffect(() => {
    if (Object.keys(petBreed).length !== 0) {
      setPage(4);
    }
  }, [petBreed]);

  return (
    <>
      <Header setPage={setPage} setOffset={setOffset} setPetsData={setPetsData} />
      {page === 0 && <Home setPetBreed={setPetBreed}/>}
      {(page === 1 || page === 2) && <BreedsList 
        page={page} offset={offset} setOffset={setOffset} petsData={petsData} setPetsData={setPetsData} setPetBreed={setPetBreed}
      />}
      {page === 4 && <BreedInfo petBreed={petBreed} setPetBreed={setPetBreed}/>}
    </>
  );
}

export default App;
