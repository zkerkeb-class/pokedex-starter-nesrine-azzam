import { useState, useEffect } from 'react';
import { getAllPokemons } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPokemons();
        setPokemons(data);
      } catch (err) {
        console.error('Erreur lors du chargement des pokémons', err);
      }
    };
    fetchData();
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(favId => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoritePokemons = pokemons.filter(p => favorites.includes(p.id));

  return (
    <div style={{ padding: '20px' }}>
      {/* Retour Accueil */}
      <Link to="/">
        <button style={{
          padding: '10px 16px',
          backgroundColor: '#ffc400',
          color: 'black',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Retour au Pokedex
        </button>
      </Link>

      <h2>⭐ Mes Pokémon Favoris</h2>

      {favoritePokemons.length === 0 ? (
  <p>Vous n&apos;avez pas encore de Pokémon en favori...</p>
      ) : (
        <div className="pokemon-container">
          {favoritePokemons.map((pokemon) => (
            <div key={pokemon.id} style={{ position: 'relative' }}>
              <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link">
                <PokemonCard pokemon={pokemon} buttonColor="#ffc400" />
              </Link>
              <button
                onClick={() => handleRemoveFavorite(pokemon.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  color: 'red',
                  cursor: 'pointer'
                }}
                title="Retirer des favoris"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
