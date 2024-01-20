import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

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
    <div onClick={handleNavigatePokemon}>
      <article>
        <header>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </header>
        <section>
          <h3>{pokemon?.name}</h3>
          <ul>
            {pokemon?.types.map((typeiInfo) => (
              <li key={typeiInfo.type.url}>{typeiInfo.type.name}</li>
            ))}
          </ul>
          <hr />
          <ul>
            {pokemon?.stats.map((statInfo) => (
              <li key={statInfo.stat.url}>
                <span>{statInfo.stat.name}</span>
                <span>{statInfo.base_stat}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default PokeCard;
