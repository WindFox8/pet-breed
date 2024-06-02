import { useState } from 'react'

function home() {
  

  return (
    <main>
        <form action="">
            <h1>Search for a cat<br />or dog breed!</h1>
            <p>Data for more than 200 cat and dog breeds</p>
            <div>
                <input type="text" />
                <select name="" id="">
                    <option value="dog">Dogs</option>
                    <option value="cat">Cats</option>
                </select>
            </div>
            <button>Search</button>
        </form>
        <div>
            <img src="./assets/dog.png" alt="dog" />
        </div>
    </main>
  )
}

export default home
