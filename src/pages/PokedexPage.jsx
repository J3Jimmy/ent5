import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import PokeCard from "../components/PokedexPage/PokeCard"
import useFetch from "../hooks/useFetch"
import SelectType from "../components/PokedexPage/SelectType"
import "../components/PokedexPage/styles/PokedexPage.css"
import ReactPaginate from 'react-paginate';

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelect] = useState('allPokemons')
  const [pageNumber, setPageNumber] = useState(0);
  const pokemonsPerPage = 24;

  const trainerName = useSelector( states => states.trainer )

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0'
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
    setPageNumber(0); // Reset page number when performing a new search
  }

  const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

  const filteredPokemons = pokemons?.results.filter(cbFilter);
  const pageCount = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const visiblePokemons = filteredPokemons.slice(pageNumber * pokemonsPerPage, (pageNumber + 1) * pokemonsPerPage);

  return (
    <div className="container__pokedex">
      <h2 className="hi__pokedex">Hi <span>{trainerName}</span>, Here you can find  yout favorite pokemon</h2>
      <form className="submit__pokedex" onSubmit={handleSearch}>
        <input className="input__pokedex" ref={inputName} type="text" />
        <button className="button__pokedex">Search</button>
      </form>
      <SelectType  setTypeSelect={setTypeSelect} />
      <div className="pokemons__pokedex">
        {
          visiblePokemons.map( pokeInfo => (
            <PokeCard
              key={pokeInfo.url}
              url={pokeInfo.url}
             />
          ) )
        }
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous"}
        nextLinkClassName={"next"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    </div>
  )
}

export default PokedexPage
