import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"


const PokeCard = ( {url} ) => {

  const [ pokemon, getPokemon ] = useFetch(url)

  useEffect (() => {
    getPokemon()
  }, [])
  
  console.log(pokemon)

  return (
    <div>
      PokeCard
    </div>
  )
}

export default PokeCard
