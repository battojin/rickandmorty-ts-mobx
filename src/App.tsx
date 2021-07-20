import React, { useEffect } from 'react';
import { CharacterStore } from './store/store'
import Main from './components/main'
import './App.css';

const App = () => {
  const store = CharacterStore.create({})

  useEffect(() => {
    store.loadCharacters()
  }, [store])

  return (
    <Main greatStore={store} />
  )
}

export default App
