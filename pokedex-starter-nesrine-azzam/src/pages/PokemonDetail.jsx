// src/pages/EditPokemon.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById, getAllPokemons, updatePokemon } from '../services/api';
import '../index.css';

function EditPokemon() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemonById(id)
      .then(setFormData)
      .catch(() => setError('Erreur lors du chargement du Pokémon.'));

    getAllPokemons().then(data => {
      const uniq = [...new Set(data.flatMap(p => p.types || []))];
      setAllTypes(uniq);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const stat = name.split('.')[1];
      setFormData(p => ({ ...p, stats: { ...p.stats, [stat]: Number(value) } }));
    } else if (name === 'name.english') {
      setFormData(p => ({ ...p, name: { ...p.name, english: value } }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const handleAddType = () => {
    const lower = selectedType.toLowerCase();
    if (lower && !(formData.types || []).includes(lower)) {
      setFormData(p => ({ ...p, types: [...(p.types || []), lower] }));
      setSelectedType('');
    }
  };

  const handleRemoveType = (t) => {
    setFormData(p => ({ ...p, types: (p.types || []).filter(x => x !== t) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      id: formData.id,
      name: { english: formData.name?.english || '' },
      types: formData.types || [],
      stats: {
        hp: formData.stats?.hp || 0,
        attack: formData.stats?.attack || 0,
        defense: formData.stats?.defense || 0,
        speed: formData.stats?.speed || 0,
      },
      image: formData.image || ''
    };

    try {
      await updatePokemon(id, cleanedData);
      alert('Pokémon mis à jour avec succès.');
      navigate('/');
    } catch (err) {
      console.error('Erreur API :', err.response?.data || err.message);
      alert('Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = () => {
    const deleted = JSON.parse(localStorage.getItem('deletedPokemons')) || [];
    deleted.push(formData);
    localStorage.setItem('deletedPokemons', JSON.stringify(deleted));
    alert('Pokémon déplacé dans Cimtrex Pokédex !');
    navigate('/');
  };

  if (error) return <div>{error}</div>;
  if (!formData) return <div>Chargement…</div>;

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '40px',
      fontFamily: "'Press Start 2P', cursive",
      background: 'linear-gradient(180deg, #a8e6ff 0%, #70c1ff 100%)'
    }}>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div 
          className="pokemon-card" 
          style={{ 
            margin: '0 auto',
            background: '#fff',
            border: '4px solid #222',
            borderRadius: '16px',
            boxShadow: '5px 5px 0px #222',
            padding: '20px',
            width: '300px'
          }}
        >
          <div className="pokemon-image-container" style={{ marginBottom: '10px' }}>
            <img
              src={formData.image || `/assets/pokemons/${formData.id}.png`}
              alt={formData.name.english}
              className="pokemon-image"
              style={{ width: '120px', height: '120px', objectFit: 'contain' }}
            />
          </div>
  
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={{
              width: '90%',
              padding: '10px',
              margin: '8px 0',
              borderRadius: '12px',
              border: '3px solid #222',
              boxShadow: '4px 4px 0px #222',
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '10px'
            }}
            placeholder="URL de l'image"
          />
  
          <input
            type="text"
            name="name.english"
            value={formData.name.english}
            onChange={handleChange}
            style={{
              width: '90%',
              padding: '10px',
              textAlign: 'center',
              margin: '8px 0',
              borderRadius: '12px',
              border: '3px solid #222',
              boxShadow: '4px 4px 0px #222',
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '10px'
            }}
            placeholder="Nom du Pokémon"
          />
  
          {/* Types */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              style={{
                flex: '1',
                padding: '8px',
                borderRadius: '12px',
                border: '3px solid #222',
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '10px',
                boxShadow: '4px 4px 0px #222'
              }}
            >
              <option value="">Choisir un type</option>
              {allTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button type="button" onClick={handleAddType} style={{
              padding: '8px 12px',
              background: '#ffcb05',
              border: '3px solid #222',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '4px 4px 0px #222'
            }}>+</button>
          </div>
  
          <div style={{ marginBottom: '10px' }}>
            {(formData.types || []).map(t => (
              <span
                key={t}
                onClick={() => handleRemoveType(t)}
                style={{
                  background: '#ffcb05',
                  color: '#222',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  margin: '0 4px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  border: '2px solid #222',
                  boxShadow: '2px 2px 0px #222'
                }}
              >
                {t} ❌
              </span>
            ))}
          </div>
  
          {/* Stats */}
          <div className="pokemon-stats" style={{ marginTop: '10px' }}>
            {['hp', 'attack', 'defense', 'speed'].map(stat => (
              <div key={stat} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '4px 0',
                fontSize: '10px'
              }}>
                <span>{stat.toUpperCase()} :</span>
                <input
                  type="number"
                  name={`stats.${stat}`}
                  value={formData.stats?.[stat] || 0}
                  onChange={handleChange}
                  style={{
                    width: '60px',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '2px solid #222',
                    textAlign: 'center',
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: '10px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* Boutons */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: '3px solid #222',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontFamily: "'Press Start 2P', cursive",
              cursor: 'pointer',
              boxShadow: '4px 4px 0px #222'
            }}
          >
            Enregistrer
          </button>
  
          <button
            type="button"
            onClick={handleDelete}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f44336',
              color: '#fff',
              border: '3px solid #222',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontFamily: "'Press Start 2P', cursive",
              cursor: 'pointer',
              boxShadow: '4px 4px 0px #222'
            }}
          >
            Supprimer
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPokemon;
