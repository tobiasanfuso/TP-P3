import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const perfumes = productList.Search

  return (

      <div className='page'>
        <header>
          <h1>Perfumes</h1>
          <form className='form'>
            <input placeholder='Perfumes Arabes' />
            <button type="submit">Buscar</button>
          </form>
        </header>
      </div>
  )
}

export default App
