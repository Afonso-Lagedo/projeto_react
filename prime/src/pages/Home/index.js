import { useEffect, useState} from 'react';
import api from '../../services/api';

//URL DA API: /movie/now_playing?api_key=cb1192ed4b3a6c3359722d5184549ab3

function Home(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                  api_key:  "cb1192ed4b3a6c3359722d5184549ab3",
                  language: "pt-BR",
                  page: 1,
                }
            })

            console.log(response.data.results);
        }

        loadFilmes();

    }, [])

    return(
        <div>
            <h1>BEM VINDO A HOME</h1>
        </div>
    )
}

export default Home;