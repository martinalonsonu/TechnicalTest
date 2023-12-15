import { useEffect, useState } from "react"
import { useApi } from "./hook/useApi"
import { Note } from "./interfaces"
import arrowDown from './assets/arrow-down.svg'
import arrowUp from './assets/arrow-up.svg'
import circle from './assets/circle.svg'
import './index.scss'

function App() {
    const [news, setNews] = useState<Note[]>([])
    const [viewMore, setViewMore] = useState<boolean>(false)
    const [visibleNews, setVisibleNews] = useState<number>(5)
    const { fetchApi } = useApi()

    useEffect(() => {
        fechData()
        //el array de dependencias se deja vacío para que el llamado a la api solo se realice cuando se monta el componente
    }, [])

    const fechData = async () => {
        const dataApi = await fetchApi()
        if (dataApi) setNews(dataApi)
    }

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
                        news?.slice(0, visibleNews).map((newItem: Note) => (
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
