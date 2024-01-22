import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import PokeCard from "../components/PokedexPage/PokeCard"
import useFetch from "../hooks/useFetch"
import SelectType from "../components/PokedexPage/SelectType"
import "../components/PokedexPage/styles/PokedexPage.css"

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelect] = useState('allPokemons')
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0'
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url)

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      getPokemons()
    } else {
      getTypePokemon(typeSelected)
    }
  }, [typeSelected])

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.trim().toLowerCase())
  }

  const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = pokemons?.results.filter(cbFilter).slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
          currentPosts && currentPosts.map(pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
            />
          ))
        }
      </div>
      <div className="pagination">
        {pokemons && (
          Array.from({ length: Math.ceil(pokemons.results.filter(cbFilter).length / postPerPage) }, (_, i) => (
            <div key={i} onClick={() => paginate(i + 1)} className="page-number">
              {i + 1}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PokedexPage
