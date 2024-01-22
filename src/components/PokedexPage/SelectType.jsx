// SelectType.js

import React, { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import "./styles/PokedexPage.css"

const SelectType = ({ setTypeSelect }) => {
  const url = 'https://pokeapi.co/api/v2/type'
  const [ types, getTypes ] = useFetch(url)

  useEffect(() => {
    getTypes()
  }, [])
  
  const typeRef = useRef()

  const handleChange = () => {
    setTypeSelect(typeRef.current.value)
  }

  return (
    <div className="select-container">
      <select ref={typeRef} onChange={handleChange}>
        <option value="allPokemons">All Pokemons</option>
        {types?.results.map((type) => (
          <option key={type.url} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectType;
