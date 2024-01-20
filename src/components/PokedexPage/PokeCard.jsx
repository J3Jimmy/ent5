import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import './styles/PokeCard.css'

const PokeCard = ({ url }) => {
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, []);

  const navigate = useNavigate()

  const handleNavigatePokemon = () => {
    navigate(`/pokedex/${pokemon.id}`)
  }

 return (
    <div className={`pokecard__border ${pokemon?.types[0].type.name}`}  onClick={handleNavigatePokemon}>
      <article className="pokecard">
        <header className="pokecard__header">
          <img
            className="pokecard__img"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </header>
        <section className="pokecard__body">
          <h3 className="pokecard__name">{pokemon?.name}</h3>
          <ul className="pokecard__types">
            {pokemon?.types.map((typeiInfo) => (
              <li className="pokecard__types__item" key={typeiInfo.type.url}>{typeiInfo.type.name}</li>
            ))}
          </ul>
          <hr className="pokecard__hr" />
          <ul className="pokecard__stats">
            {pokemon?.stats.map((statInfo) => (
              <li className="pokecard__stats__item" key={statInfo.stat.url}>
                <span className="pokecard__stats__label">{statInfo.stat.name}</span>
                <span className="pokecard__stats__value">{statInfo.base_stat}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default PokeCard;
