import { useSelector } from 'react-redux'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PokedexPage from './pages/PokedexPage'
import PokemonPage from './pages/PokemonPage'
import ProtectedRoutes from './pages/ProtectedRoutes'

function App() {

  
  return (
   <div>
    <Routes>
    <Route path='/' element={<HomePage />} />
    <Route element={<ProtectedRoutes />}>
      <Route path='/pokedex' element={<PokedexPage/>} />
      <Route path='/pokedex/:id' element={<PokemonPage />} />
    </Route>
    </Routes>
    <h1>pokedex</h1>
   </div>
  )
}

export default App
