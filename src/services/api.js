import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL DA API: https://api.themoviedb.org/3/movie/popular?api_key=7a8e988df0c98a78f5908610d79cf071&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;