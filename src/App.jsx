import { useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import FileBrowser from './components/FileBrowser/FileBrowser'
import EditorPage from './pages/EditorPage'
import ButtonExamples from './components/Button/Button.stories'
import SelectExamples from './components/Select/Select.stories'
import { FavoritesProvider } from './contexts/FavoritesContext'

function App() {
  // Устанавливаем темную тему по умолчанию
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <Router>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<FileBrowser />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/buttons" element={<ButtonExamples />} />
          <Route path="/select" element={<SelectExamples />} />
        </Routes>
      </FavoritesProvider>
    </Router>
  )
}

export default App
