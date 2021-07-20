import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import Character from './character'

const Main = observer(({greatStore}: any) => {
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [charName, setCharName] = useState('')
  const [favorites, setFavorites] = useState([])
  const [myLocalStorageData, setMyLocalStorageData] = useState([]) 

  useEffect(() => {
    if (favorites.length > 0) localStorage.setItem("favorites", JSON.stringify(favorites))
    const data:any = localStorage.getItem('favorites')
    if (data !== null) setMyLocalStorageData(JSON.parse(data))
  }, [favorites])

  function handleGenderChange(e: any) {
    e.preventDefault()
    setGender(e.target.value)
  }
  function handleStatusChange(e: any) {
    e.preventDefault()
    setStatus(e.target.value)
  }
  function handleNameChange(e: any) {
    e.preventDefault()
    setCharName(e.target.value)
  }

  function handleFavorites(char: never) {
    if (favorites.includes(char)) {
      return
    } else {
      setFavorites([...favorites, char])
    }
  }

  return (
    <div style={{margin: '0 50px 0 50px'}}>
        <h3>Number of my favorites characters: {myLocalStorageData.length > 0 && myLocalStorageData.length}</h3>
        <form>
          <input 
            type="search" 
            placeholder="Search for a character" 
            value={charName} 
            onChange={handleNameChange} 
            />
          <select value={status} onChange={handleStatusChange}>
              <option value="" selected hidden>Choose here</option>
              <option value="">None</option>
              <option value='Alive'>Alive</option>
              <option value='Dead'>Dead</option>
              <option value='unknown'>Unknown</option>
          </select>
          <select value={gender} onChange={handleGenderChange}>
              <option value="" selected hidden>Choose here</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="unknown">unknown</option>
              <option value="">None</option>
              <option value="genderless">Genderless</option>
          </select>
          <button type="button" style={{float: 'right'}} onClick={() => greatStore.loadCharacters()}>Load more characters</button>
        </form>
      <div className="characters">
      {greatStore.filter(status, gender, charName).map((character: any) => 
            <Character 
              handleFavorites={handleFavorites} 
              greatStore={greatStore} 
              char={character} 
              key={character.id}
              />)}
      </div>
      <div>
      </div>
    </div>
  )
})

export default Main
