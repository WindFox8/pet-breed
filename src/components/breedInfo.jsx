import React, { useState, useEffect } from 'react';
import '../styles/breedInfo.sass';

function BreedInfo({ petBreed, setPetBreed }) {
  const [petsData, setPetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = 'LSUFCbRK3UZcmPJaTz1bwA==TKD5YHaM8Pwj0Nxw';

    fetch(`https://api.api-ninjas.com/v1/${petBreed.type}?name=${petBreed.breed}`, {
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
      setPetsData(data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      setError(error.message);
      setIsLoading(false);
    });
  }, [petBreed]);

  const handleBreedClick = (pet, breedName) => {
    setPetBreed({ type: pet, breed: breedName });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (petsData.length > 1) {
    return (
      <ul>
        {petsData && petsData.map(pet => (
          <li key={pet.name} onClick={() => handleBreedClick(petBreed.type, pet.name)}>
            <img src={pet.image_link} alt={pet.name} />
            <p>{pet.name}</p>
          </li>
        ))}
      </ul>
    );
  }

  const petData = petsData[0];

  if (!petData) {
    return null;
  }

  return (
    <main>
      {petBreed.type === 'dogs' ? (
        <div className='infoBreedLeft'>
          <p>Good with children (1 - 5): {petData.good_with_children}</p>
          <p>Good with other dogs (1 - 5): {petData.good_with_other_dogs}</p>
          <p>Shedding (1 - 5): {petData.shedding}</p>
          <p>Grooming (1 - 5): {petData.grooming}</p>
          <p>Drooling (1 - 5): {petData.drooling}</p>
          <p>Coat length (1 - 5): {petData.coat_length}</p>
          <p>Good with strangers (1 - 5): {petData.good_with_strangers}</p>
          <p>Playfulness (1 - 5): {petData.playfulness}</p>
          <p>Protectiveness (1 - 5): {petData.protectiveness}</p>
          <p>Trainability (1 - 5): {petData.trainability}</p>
          <p>Energy (1 - 5): {petData.energy}</p>
          <p>Barking (1 - 5): {petData.barking}</p>
          <p>Life expectancy: {petData.min_life_expectancy} - {petData.max_life_expectancy} years</p>
          <p>Height (Male): {petData.min_height_male} - {petData.max_height_male} inches</p>
          <p>Height (Female): {petData.min_height_female} - {petData.max_height_female} inches</p>
          <p>Weight (Male): {petData.min_weight_male} - {petData.max_weight_male} lbs</p>
          <p>Weight (Female): {petData.min_weight_female} - {petData.max_weight_female} lbs</p>
        </div>
      ) : (
        <div className='infoBreedLeft'>
          <p>Length: {petData.length}</p>
          <p>Origin: {petData.origin}</p>
          <p>Family friendly (1 - 5): {petData.family_friendly}</p>
          <p>Shedding (1 - 5): {petData.shedding}</p>
          <p>General health (1 - 5): {petData.general_health}</p>
          <p>Playfulness (1 - 5): {petData.playfulness}</p>
          <p>Children friendly (1 - 5): {petData.children_friendly}</p>
          <p>Grooming (1 - 5): {petData.grooming}</p>
          <p>Intelligence (1 - 5): {petData.intelligence}</p>
          <p>Other pets friendly (1 - 5): {petData.other_pets_friendly}</p>
          <p>Life expectancy: {petData.min_life_expectancy} - {petData.max_life_expectancy} years</p>
          <p>Weight: {petData.min_weight} - {petData.max_weight} lbs</p>
        </div>
      )}
      <div className='infoBreedRight'>
        <h1>{petData.name}</h1>
        <br />
        <img src={petData.image_link} alt={petData.name} />
      </div>
    </main>
  );
}

export default BreedInfo;
