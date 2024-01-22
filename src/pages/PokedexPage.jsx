import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import PokeCard from "../components/PokedexPage/PokeCard"
import useFetch from "../hooks/useFetch"
import SelectType from "../components/PokedexPage/SelectType"
import "../components/PokedexPage/styles/PokedexPage.css"

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [typeSelect, setTypeSelect] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12) // Estado para la cantidad de cartas por página

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  const [pokemons, getPokemons, getTypePokemons] = useFetch(url)

  useEffect(() => {
    if (typeSelect === 'All Pokemons' || typeSelect === '') {
      getPokemons()
    } else {
      getTypePokemons(typeSelect)
    }
    setCurrentPage(1)
  }, [typeSelect])

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.trim().toLowerCase())
  }

  const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const visiblePokemons = pokemons?.results?.filter(cbFilter)?.slice(startIdx, endIdx) || []

  const totalPages = Math.ceil(pokemons?.results?.filter(cbFilter)?.length / itemsPerPage) || 1

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reiniciar a la primera página al cambiar la cantidad de cartas por página
  }

  let imageUrl

  if (typeof process !== "undefined") {
    // Código solo para el servidor (Node.js)
    imageUrl = process.env.REACT_APP_IMAGE_URL // Reemplaza REACT_APP_IMAGE_URL con tu variable de entorno real
  }

  return (
    <div className="container__pokedex">
      <h2 className="hi__pokedex">Hi <span>{trainerName}</span>, Here you can find your favorite pokemon</h2>
      <form className="submit__pokedex" onSubmit={handleSearch}>
        <input className="input__pokedex" ref={inputName} type="text" />
        <button className="button__pokedex">Search</button>
      </form>
      <SelectType setTypeSelect={setTypeSelect} />
      <div className="pokemons__pokedex">
        {
          visiblePokemons && visiblePokemons.map(pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div>
      <div>
        <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  )
}

export default PokedexPage
