import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "../components/PokedexPage/styles/pokemonPageCard.css";

const PokemonPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="container__poke__card">
      <article>
      <div className="pokemon__page__card">
        <header className={`poke__page__header ${pokemon?.types[0].type.name}`}>
        
        <div className="img__header">
        
          <img src="/src/assets/pokemon__header.png" alt="" />
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
            className="pokemon__image__page"
          />
        </div>
        </header>
        <div className={`id__button ${pokemon?.types[0].type.name}`}>
          <p className="id__">#{pokemon?.id}</p>
        </div>

        <h2 className="name__">{pokemon?.name}</h2>
        <div className="row__wh">
          <p className="weight__height">
            <strong>Weight:</strong> {pokemon?.weight}
          </p>
          <p className="weight__height">
            <strong>Height:</strong> {pokemon?.height}
          </p>
        </div>
        <div className="TandH">
          <div className="column_tandh">
            <h3 className="h3__poke__page">Types:</h3>
            <ul className={`t__h__ ${pokemon?.types[0].type.name}`}>
              {pokemon?.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h3 className="h3__poke__page">Abilities:</h3>
            <ul className={`t__h__ ${pokemon?.types[0].type.name}`}>
              {pokemon?.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stats__name">
          <h3 className="h3__poke__page">Stats:</h3>
          <ul className="pokecard__stats">
            {pokemon?.stats.map((stat, index) => (
              <li key={index}>
                <span>{stat.stat.name}</span>
                <br />
                <progress
                  value={stat.base_stat}
                  max={150}
                  className="progress__poke__page"
                >
                </progress>
                <span>{stat.base_stat}/150</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`poke__page__moves ${pokemon?.types[0].type.name}`}>
          <h3 className="h3__poke__page">Movements:</h3>
          <ul>
            {pokemon?.moves.slice(0, 5).map((move, index) => (
              <li key={index}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      </div>
      </article>
    </div>
  );
};

export default PokemonPage;
