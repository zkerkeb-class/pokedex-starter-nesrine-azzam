import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Récupère tous les Pokémon
export const getAllPokemons = async () => {
  const response = await axios.get(`${API_BASE_URL}/pokemons`);
  return response.data;
};

export const getPokemonById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pokemons/${id}`, getAuthHeaders());
  return response.data;
};

export const createPokemon = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/pokemons`, data, getAuthHeaders());
  return response.data;
};

export const updatePokemon = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/pokemons/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deletePokemon = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}`, getAuthHeaders());
  return response.data;
};