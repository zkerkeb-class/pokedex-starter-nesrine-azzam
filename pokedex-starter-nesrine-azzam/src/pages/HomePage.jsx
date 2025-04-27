import { useState, useEffect } from 'react';
import { getAllPokemons } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import pokedexLogo from '../assets/pokedex/pokedex.png';

function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('default');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const pokemonsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getAllPokemons();
        setPokemons(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des Pokémon.');
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const uniqueTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.type || pokemon.types || []))];

  const deletedPokemons = JSON.parse(localStorage.getItem('deletedPokemons')) || [];
  const deletedIds = deletedPokemons.map(p => p.id);
  const pokemonsFiltered = pokemons.filter(p => !deletedIds.includes(p.id));

  let finalPokemons = [...pokemonsFiltered];
  if (sortOrder === 'hp') {
    finalPokemons.sort((a, b) => (b.stats?.hp || 0) - (a.stats?.hp || 0));
  }

  const filteredPokemons = finalPokemons.filter(
    (pokemon) =>
      (selectedType === '' || (pokemon.types || pokemon.type || []).includes(selectedType)) &&
      (pokemon.name.english || pokemon.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleFavorite = (pokemonId) => {
    let updatedFavorites;
    if (favorites.includes(pokemonId)) {
      updatedFavorites = favorites.filter(id => id !== pokemonId);
    } else {
      updatedFavorites = [...favorites, pokemonId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      {/* Connexion / inscription / déconnexion */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 20px' }}>
        <button
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#ffc400', color: 'black', border: 'none', borderRadius: '5px' }}
        >
          Se déconnecter
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/favorites">
            <button style={{ padding: '8px 16px', backgroundColor: '#ffc400', color: 'black', border: 'none', borderRadius: '5px' }}>
              ⭐ Voir mes Favoris
            </button>
          </Link>
          <Link to="/login">
            <button style={{ padding: '8px 16px', backgroundColor: '#ffc400', color: 'black', border: 'none', borderRadius: '5px' }}>
              Se connecter
            </button>
          </Link>
          <Link to="/register">
            <button style={{ padding: '8px 16px', backgroundColor: '#ffc400', color: 'black', border: 'none', borderRadius: '5px' }}>
              {"S'inscrire"}
            </button>
          </Link>
        </div>
      </div>

      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={pokedexLogo} alt="Pokedex Logo" style={{ width: '300px' }} />
      </div>

      {/* Barre de recherche + filtre + créer + trier */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1000px', gap: '10px' }}>
          <input
            type="text"
            placeholder="Rechercher un Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, border: '2px solid black', borderRadius: '4px', padding: '10px' }}
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ flex: 1, border: '2px solid black', borderRadius: '4px', padding: '10px', color: 'black' }}
          >
            <option value="">Tous les types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <Link to="/create" style={{ flex: 1 }}>
            <button
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#ffc400',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}
            >
              Créer un Pokémon
            </button>
          </Link>
          <button
            onClick={() => setSortOrder('hp')}
            style={{
              flex: 1,
              padding: '8px 16px',
              backgroundColor: '#ffc400',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Trier par HP
          </button>
        </div>
      </div>

      {/* Espacement */}
      <div style={{ height: '30px' }} />

      {/* Cartes Pokémon */}
      <div className="pokemon-container">
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} style={{ position: 'relative' }}>
            <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link">
              <PokemonCard pokemon={pokemon} buttonColor="#ffc400" />
            </Link>
            <button
              onClick={() => toggleFavorite(pokemon.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              {favorites.includes(pokemon.id) ? '⭐' : '☆'}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              padding: '8px 12px',
              backgroundColor: num === currentPage ? '#ffc400' : '#e0e0e0',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
