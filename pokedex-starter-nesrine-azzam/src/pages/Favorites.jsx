import { useEffect, useState } from 'react';
import { getAllPokemons } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Favorites() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getAllPokemons();
        const favoritesIds = JSON.parse(localStorage.getItem('favorites')) || [];

        const favoritePokemons = data.filter(pokemon => favoritesIds.includes(pokemon.id));
        setPokemons(favoritePokemons);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des favoris.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>⭐ Mes Pokémon Favoris ⭐</h1>

      <div className="pokemon-container">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link" key={pokemon.id}>
              <PokemonCard pokemon={pokemon} buttonColor="#ffc400" />
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '40px' }}>Pas encore de Pokémon favori...</p>
        )}
      </div>
    </div>
  );
}
