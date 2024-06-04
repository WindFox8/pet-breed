import React, { useState, useEffect } from 'react';

function BreedInfo({ petBreed }) {
  const [petData, setPetData] = useState(null);
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
      setPetData(data[0]);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      setError(error.message);
      setIsLoading(false);
    });
  }, [petBreed]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!petData) {
    return null;
  }

  return (
    <main>
      <h1>{petData.name}</h1>
      <img src={petData.image_link} alt={petData.name} />
      {petBreed.type === 'dog' ? (
        <div>
          <p>Good with children: {petData.good_with_children}</p>
          <p>Good with other dogs: {petData.good_with_other_dogs}</p>
          <p>Shedding: {petData.shedding}</p>
          <p>Grooming: {petData.grooming}</p>
          <p>Drooling: {petData.drooling}</p>
          <p>Coat length: {petData.coat_length}</p>
          <p>Good with strangers: {petData.good_with_strangers}</p>
          <p>Playfulness: {petData.playfulness}</p>
          <p>Protectiveness: {petData.protectiveness}</p>
          <p>Trainability: {petData.trainability}</p>
          <p>Energy: {petData.energy}</p>
          <p>Barking: {petData.barking}</p>
          <p>Life expectancy: {petData.min_life_expectancy} - {petData.max_life_expectancy} years</p>
          <p>Height (Male): {petData.min_height_male} - {petData.max_height_male} inches</p>
          <p>Height (Female): {petData.min_height_female} - {petData.max_height_female} inches</p>
          <p>Weight (Male): {petData.min_weight_male} - {petData.max_weight_male} lbs</p>
          <p>Weight (Female): {petData.min_weight_female} - {petData.max_weight_female} lbs</p>
        </div>
      ) : (
        <div>
          <p>Length: {petData.length}</p>
          <p>Origin: {petData.origin}</p>
          <p>Family friendly: {petData.family_friendly}</p>
          <p>Shedding: {petData.shedding}</p>
          <p>General health: {petData.general_health}</p>
          <p>Playfulness: {petData.playfulness}</p>
          <p>Children friendly: {petData.children_friendly}</p>
          <p>Grooming: {petData.grooming}</p>
          <p>Intelligence: {petData.intelligence}</p>
          <p>Other pets friendly: {petData.other_pets_friendly}</p>
          <p>Life expectancy: {petData.min_life_expectancy} - {petData.max_life_expectancy} years</p>
          <p>Weight: {petData.min_weight} - {petData.max_weight} lbs</p>
        </div>
      )}
    </main>
  );
}

export default BreedInfo;
