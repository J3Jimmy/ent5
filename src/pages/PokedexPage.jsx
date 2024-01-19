import { useEffect } from "react"
import { useSelector } from "react-redux"
import PokeCard from "../components/PokedexPage/PokeCard"
import useFetch from "../hooks/useFetch"


const PokedexPage = () => {

  const trainerName = useSelector( states => states.trainer )

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  const [ pokemons, getPokemons ] = useFetch(url)

  useEffect(() => {
    getPokemons()
  },[])
  

  return (
    <div>
      <h2>Hi <span>{trainerName}</span>, Here you can find  yout favorite pokemon</h2>
      {
        pokemons?.results.map( pokeInfo => (
          <PokeCard
            key={pokeInfo.url}
            url={pokeInfo.url}
           />
        ) )
      }
    </div>
  )
}

export default PokedexPage
