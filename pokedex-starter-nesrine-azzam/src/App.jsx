import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonDetail from './pages/PokemonDetail';
import CreatePokemon from './pages/CreatePokemon';
import EditPokemon from './pages/EditPokemon';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites'; // ✅ Nouveau
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="/edit/:id" element={<EditPokemon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} /> {/* ✅ */}
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
