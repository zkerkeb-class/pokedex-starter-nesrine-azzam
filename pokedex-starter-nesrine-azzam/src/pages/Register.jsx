import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css'; // Assure-toi que les styles globaux sont bien chargés
import pokedexLogo from '../assets/pokedex/pokedex.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/register', { email, password });
      navigate('/login');
    } catch (err) {
      console.error(err); // Pour corriger eslint
      setError("Erreur lors de l'inscription.");
    }
  };

  // Gestion du survol du bouton
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#e3f2fd', // Couleur bleu clair
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
        paddingTop: '20px'
      }}>
        <img src={pokedexLogo} alt="Pokedex Logo" style={{ width: '180px', marginBottom: '20px' }} />
        <h2 style={{ marginBottom: '20px', color: '#222' }}>Créer un compte</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={{
              ...buttonStyle,
              backgroundColor: isHovered ? '#ff5733' : '#ffc400', // Changement de couleur au survol
              color: 'white',
              marginTop: '15px'
            }}
            onMouseEnter={() => setIsHovered(true)}  // Survol
            onMouseLeave={() => setIsHovered(false)}  // Fin du survol
          >
            S&apos;inscrire
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
        <p style={{ marginTop: '15px' }}>
          Vous avez déjà un compte ? <Link to="/login" style={{ color: '#ffc400' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 20px',
  margin: '10px 0',
  borderRadius: '12px',
  border: '3px solid #222', // Contour noir style Pokémon
  backgroundColor: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: "'Press Start 2P', cursive",
  fontSize: '14px',
  color: '#333',
  boxShadow: '4px 4px 0px #222' // Effet rétro
};

const buttonStyle = {
  padding: '12px 20px',
  width: '100%',
  border: '3px solid #222',
  borderRadius: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  backgroundColor: '#ffc400', // Jaune Pikachu
  color: '#222',
  fontFamily: "'Press Start 2P', cursive",
  fontSize: '14px',
  boxShadow: '4px 4px 0px #222',
  transition: 'all 0.2s ease-in-out'
};

export default Register;
