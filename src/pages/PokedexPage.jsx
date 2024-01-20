import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import PokeCard from "../components/PokedexPage/PokeCard"
import useFetch from "../hooks/useFetch"
import SelectType from "../components/PokedexPage/SelectType"


const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelect] = useState('allPokemons')

  const trainerName = useSelector( states => states.trainer )

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [ pokemons, getPokemons, getTypePokemon ] = useFetch(url)

  useEffect(() => {
    if(typeSelected === 'allPokemons'){
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

  return (
    <div>
      <h2>Hi <span>{trainerName}</span>, Here you can find  yout favorite pokemon</h2>
      <form onSubmit={handleSearch}>
        <input ref={inputName} type="text" />
        <button>Search</button>
      </form>
      <SelectType setTypeSelect={setTypeSelect} />
      <div>
      {
        pokemons?.results.filter(cbFilter).map( pokeInfo => (
          <PokeCard
            key={pokeInfo.url}
            url={pokeInfo.url}
           />
        ) )
      }
    </div>
    </div>
  )
}

export default PokedexPage
