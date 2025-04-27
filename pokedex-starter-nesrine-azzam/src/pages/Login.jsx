import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pokedexImage from '../assets/pokedex/pokedex-login.png';
import pokedexLogo from '../assets/pokedex/pokedex.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err); // Ajoute ça pour utiliser 'err' et corriger ESLint
      setError('Identifiants incorrects ou erreur serveur.');
    }
  };
  

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'linear-gradient(to right, #f1da36, #1e90ff)', // Jaune et bleu dégradé
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Colonne gauche avec images */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(to top, #f1da36, #1e90ff)', // Jaune à bleu pour la colonne gauche
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <img src={pokedexLogo} alt="Pokédex" style={{ maxWidth: '300px', marginBottom: '20px' }} />
        <img src={pokedexImage} alt="Pokedex Device" style={{ maxWidth: '80%', height: 'auto' }} />
      </div>

      {/* Colonne droite avec formulaire */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #f1da36, #1e90ff)' // Jaune à bleu pour la colonne droite
      }}>
        <div style={{
          width: '80%',
          maxWidth: '400px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#00695c' }}>Connexion à votre compte</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                border: '1px solid #b2dfdb',
                borderRadius: '4px'
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                border: '1px solid #b2dfdb',
                borderRadius: '4px'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(to right, #00b4db, #0083b0)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Se connecter
            </button>
            {error && (
              <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                {error}
              </p>
            )}
          </form>
          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            Pas encore de compte ?{' '}
            <a
              href="/register"
              style={{
                color: '#00796b',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
