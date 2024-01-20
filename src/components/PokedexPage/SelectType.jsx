import useFetch from "../../hooks/useFetch"

const SelectType = () => {


  const url = 'https://pokeapi.co/api/v2/type'
  const [ types, getTypes ] = useFetch(url)

  useEffect(() => {
  getTypes()
  }, [])
  

  return (
    <select>
     <option value='allPokemons'>All Pokemons</option>
     {
       types?.results.map( type => (
         <option key={type.url} value={type.url}>{type.name}</option>
       ) )
     }
    </select>
  )
}

export default SelectType
