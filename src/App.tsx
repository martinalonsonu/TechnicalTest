import axios from "axios"
import { useEffect, useState } from "react"
import arrowDown from './assets/arrow-down.svg'
import arrowUp from './assets/arrow-up.svg'
import circle from './assets/circle.svg'
import './index.scss'

interface NewsApi {
    id: string;
    autor: string;
    date: string;
    image: string;
    section: string;
    title: string;
    type: string;
}

function App() {
    const [news, setNews] = useState<NewsApi[]>([])
    const [viewMore, setViewMore] = useState<boolean>(false)
    const [visibleNews, setVisibleNews] = useState<number>(5)

    // usamos try-catch para un mejor manejo y control de errores y axios para hacer la petición
    useEffect(() => {
        const importDataApi = async () => {
            try {
                const response = await axios.get('https://api.jsonbin.io/v3/b/63654b012b3499323bf58225')
                if (response) {
                    //si existe una respuesta podemos almacenar nuestra información en el estado local para su manejo
                    const data: NewsApi[] = response.data?.record?.notes
                    setNews(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        importDataApi()
        //el array de dependencias se deja vacío para que el llamado a la api solo se realice cuando se monta el componente
    }, [])

    const handleChangeButton = () => {
        // esta función nos permite cambiar el estado de "viewMore" que controla el botón de "ver más"
        setViewMore(!viewMore);
        if (!viewMore) {
            setVisibleNews(news.length); //definimos cuantas "news" se van a mostrar
        } else {
            setVisibleNews(5);
        }
    }

    return (
        <>
            <div className="container">
                <div className="container-title">
                    <p>ÚLTIMAS NOTICIAS</p>
                    <div className="container-title-line"></div>
                </div>
                <div className="container-items">
                    {news.length > 0 && (
                        //el slice particiona la información para evitar hacer más peticiones a la API
                        news?.slice(0, visibleNews).map((newItem: NewsApi) => (
                            <div key={newItem.id} className="container-items-news">
                                <img className="container-icon" src={circle} alt="circle" />
                                <p>{newItem.title}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="container-button" onClick={handleChangeButton}>
                    {/* los condicionales ternarios son para darle dinamismo al botón */}
                    <button className="container-button-btn" >{viewMore ? "VER MENOS" : "VER MÁS"}</button>
                    <img className="container-button-icon" src={viewMore ? arrowUp : arrowDown} alt="arrowDownIcon" />
                </div>
            </div>
        </>
    )
}

export default App
