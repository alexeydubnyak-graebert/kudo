import { useEffect } from 'react'
import './App.css'
import FileBrowser from './components/FileBrowser/FileBrowser'
import { FavoritesProvider } from './contexts/FavoritesContext'

function App() {
  // Устанавливаем темную тему по умолчанию
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <FavoritesProvider>
      <FileBrowser />
    </FavoritesProvider>
  )
}

export default App
