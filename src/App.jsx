import { useEffect, useState } from 'react'
import './App.css'
import FileBrowser from './components/FileBrowser/FileBrowser'
import ButtonExamples from './components/Button/Button.stories'
import SelectExamples from './components/Select/Select.stories'
import { FavoritesProvider } from './contexts/FavoritesContext'

function App() {
  const [currentPage, setCurrentPage] = useState('browser') // 'browser' | 'buttons' | 'select'

  // Устанавливаем темную тему по умолчанию
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  // Переключение страниц по URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'buttons') {
        setCurrentPage('buttons')
      } else if (hash === 'select') {
        setCurrentPage('select')
      } else {
        setCurrentPage('browser')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentPage === 'buttons') {
    return <ButtonExamples />
  }

  if (currentPage === 'select') {
    return <SelectExamples />
  }

  return (
    <FavoritesProvider>
      <FileBrowser />
    </FavoritesProvider>
  )
}

export default App
