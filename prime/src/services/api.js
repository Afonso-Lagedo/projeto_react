import axios from 'axios';

//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=cb1192ed4b3a6c3359722d5184549ab3&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;