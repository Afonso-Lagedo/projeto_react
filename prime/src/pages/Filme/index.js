import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import'./filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,
            {
             params:{
                api_key:  "cb1192ed4b3a6c3359722d5184549ab3",
                language: "pt-BR",
             }   
            }
            )
            .then((response)=>{
                setFilme(response.data);
                //console.log(response.data);
                setLoading(false);
            })
            .catch(()=>{
                //console.log("Filme não encontrado")
                navigate("/", { replace:true });
                return;
            })
        }

        loadFilme();

        return()=>{
            console.log("Componente desmontado");
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix"); //chave local storage
        
        let filmesSalvos = JSON.parse(minhaLista) || []; //salvando dentro de filmesSalvos o que existe no local storage que se vazio salva o vazio

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id); //verificando se filme já está salvo 

        if(hasFilme){
            toast.warn("ESSE FILME JÁ ESTÁ NA LISTA");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("SALVO COM SUCESSO");
    }
    
    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;