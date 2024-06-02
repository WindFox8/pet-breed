import { useState } from 'react'

function header() {
  

  return (
    <header>
        <div>
            <img src="./assets/paw.svg" alt="paw" />
            <h4>Pets Breeds</h4>
        </div>
        <ul>
            <li>Home</li>
            <li>Dogs</li>
            <li>Cats</li>
            <li><img src="./assets/glass.svg" alt="glass" /></li>
        </ul>
    </header>
  )
}

export default header
