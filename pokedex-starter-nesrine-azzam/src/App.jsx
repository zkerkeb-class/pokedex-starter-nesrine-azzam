import "./App.css";
import PokemonCard from "./components/pokemonCard";
import pokemons from "./assets/pokemons";
import SearchBar from "./components/searchBar";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    console.log(search);
    console.log(selectedTypes);
  }, [search, selectedTypes]);

  return (
    <div className="app-container">
      <div className="search-bar-container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </div>

      <div className="pokemon-list-container">
        {pokemons.map((pokemon) => {
          if (!pokemon.name.french.toLowerCase().includes(search.toLowerCase()) || !selectedTypes.every(type => pokemon.type.includes(type))) {
            return null;
          }
          return (
            <div key={pokemon.id} className="pokemon-card-container">
              <PokemonCard
                name={pokemon.name.french}
                image={pokemon.image}
                types={pokemon.type}
                hp={pokemon.base.HP}
                attack={pokemon.base.Attack}
                defense={pokemon.base.Defense}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
