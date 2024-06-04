import React, { useState, useEffect } from 'react';
import '../styles/breedsList.sass';

function BreedsList({ page, offset, setOffset, petsData, setPetsData, setPetBreed }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    const apiKey = 'LSUFCbRK3UZcmPJaTz1bwA==TKD5YHaM8Pwj0Nxw';

    fetch(`https://api.api-ninjas.com/v1/${page === 1 ? 'dogs' : 'cats'}?max_weight=9999&offset=${offset}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setPetsData(prevData => [...prevData, ...data]);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      setError(error.message);
      setIsLoading(false);
    });
  }, [offset, page]);

  const handleButtonClick = () => {
    setOffset(offset + 20);
  };

  const handleBreedClick = (pet, breedName) => {
    setPetBreed({ type: pet, breed: breedName });
  };

  return (
    <section className='breedsList'>
      <h1>{page === 1 ? 'Dog' : 'Cat'} BREEDS</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {petsData && petsData.map(pet => (
          <li key={pet.name} onClick={() => handleBreedClick(page === 1 ? 'dogs' : 'cats', pet.name)}>
            <img src={pet.image_link} alt={pet.name} />
            <p>{pet.name}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleButtonClick} disabled={isLoading}>{isLoading ? 'Loading' : 'Load More'}</button>
    </section>
  );
}

export default BreedsList;
