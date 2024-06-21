import React, { useState, useEffect, useRef } from 'react';
import '../styles/header.sass';

function Header({ setPage, setOffset, setPetsData }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('dogs');
  const [petsData, setPetsDataState] = useState([]);
  const formRef = useRef(null);

  const searchBreeds = () => {
    if (query.trim() === '') return;

    setIsLoading(true);
    const apiKey = 'LSUFCbRK3UZcmPJaTz1bwA==TKD5YHaM8Pwj0Nxw';

    fetch(`https://api.api-ninjas.com/v1/${category}?name=${query}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('A resposta da rede não foi ok');
        }
        return response.json();
      })
      .then(data => {
        setPetsDataState(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Houve um problema com a sua operação de fetch:', error);
        setError(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    searchBreeds();
  }, [query, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchBreeds();
  };

  const handleNavClick = (key) => {
    setPage(key);
    setOffset(0);
    setPetsData([]);
  };

  const toggleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);

  return (
    <header>
      <div onClick={() => handleNavClick(0)}>
        <img src="./src/assets/paw.svg" alt="paw" />
        <h4>Pets Breeds</h4>
      </div>

      { !showSearchBar ?
        <ul>
          <li onClick={() => handleNavClick(0)}>Home</li>
          <li onClick={() => handleNavClick(1)}>Dogs</li>
          <li onClick={() => handleNavClick(2)}>Cats</li>
          <li onClick={toggleShowSearchBar}><img src="./src/assets/glass.svg" alt="glass" /></li>
        </ul>
        :
        <form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              list="breed-options"
              placeholder={category === 'dogs' ? 'Golden Retriever' : 'Maine Coon'}
            />
            <datalist id="breed-options">
              {petsData.map((pet, index) => (
                <option key={index} value={pet.name} />
              ))}
            </datalist>
            <select 
              name="category" 
              id="category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="dogs">Dogs</option>
              <option value="cats">Cats</option>
            </select>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      }
      {error && <p style={{color: 'red'}}>{error}</p>}
    </header>
  );
}

export default Header;
