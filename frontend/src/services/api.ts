import axios from 'axios';

// ANTI-PATTERN: Pas d'intercepteur global pour gérer les erreurs
// ANTI-PATTERN: Token ajouté manuellement à chaque requête
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
