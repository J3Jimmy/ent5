import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"

const PokemonPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [ pokemon, getPokemon ] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])
  

  return (
    <div>
      <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
      <h2>{pokemon?.name}</h2>
    </div>
  )
}

export default PokemonPage
