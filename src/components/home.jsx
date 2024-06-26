import React, { useState, useEffect } from 'react';
import spinnerImage from '../assets/spinner-solid.svg';
import dogImage from '../assets/dog.png';
import '../styles/home.sass';

function Home({ setPetBreed }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('dogs');
    const [petsData, setPetsData] = useState([]);

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
    };

    useEffect(() => {
        searchBreeds();
    }, [query, category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPetBreed({ type: category, breed: query });
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div id='container'>
                    <h1>Search for a cat<br />or dog <span>breed!</span></h1>
                    <p>Data for more than 200 cat and dog breeds</p>
                    <div id='inputContainer'>
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
                            {isLoading ? 
                            (<><img src={spinnerImage} alt="Loading"/></>) 
                            : 'Search'}
                        </button>
                    </div>
                </div>
                
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                <img src={dogImage} alt="dog" />
            </div>
        </main>
    );
}

export default Home;
