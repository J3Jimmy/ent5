import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import '../components/PokedexPage/styles/pokemonPageCard.css'

const PokemonPage = () => {

  const { id } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [ pokemon, getPokemon ] = useFetch(url)

  useEffect(() => {
    getPokemon()
  }, [])
  

  return (
    <div className="pokemon__page__card"> 
      <img src="/src/assets/pokemon__header.png" alt="" />
      <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" className="pokemon__image__page" />
      <p className="center__page">#{pokemon?.id}</p>
      <h2 className="center__page">{pokemon?.name}</h2>      
      <div className="row__wh">
      <p className="weight__height">Weight: {pokemon?.weight}</p>
      <p className="weight__height">Height: {pokemon?.height}</p>
      </div>
      <div className="TandH">
        <div className="column_tandh">
        <h3 className="types__habilities">Types:</h3>
      <ul>
      {pokemon?.types.map((type, index) => (
        <li key={index}>{type.type.name}</li>
      ))}
    </ul>
  </div>
  <div className="column">
    <h3 className="types__habilities">Abilities:</h3>
    <ul>
      {pokemon?.abilities.map((ability, index) => (
        <li key={index}>{ability.ability.name}</li>
      ))}
    </ul>
  </div>
</div>

      <h3>Stats:</h3>
      <ul>
        {pokemon?.stats.map((stat, index) => (
          <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
      <h3>Moves:</h3>
      <ul>
        {pokemon?.moves.slice(0, 5).map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonPage
