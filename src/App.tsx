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

    useEffect(() => {
        const importDataApi = async () => {
            try {
                const response = await axios.get('https://api.jsonbin.io/v3/b/63654b012b3499323bf58225')
                if (response) {
                    const data: NewsApi[] = response.data?.record?.notes
                    setNews(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        importDataApi()
    }, [viewMore])

    const handleChangeButton = () => {
        setViewMore(!viewMore);
        if (!viewMore) {
            setVisibleNews(news.length);
        } else {
            setVisibleNews(5);
        }
    }

    console.log(news)
    return (
        <>
            <div className="container">
                <div>
                    <p className="container-title">ÚLTIMAS NOTICIAS</p>
                </div>
                <div className="container-items">
                    {news.length > 0 && (
                        news?.slice(0, visibleNews).map((newItem: NewsApi) => (
                            <div key={newItem.id} className="container-items-news">
                                <img className="container-icon" src={circle} alt="circle" />
                                <p>{newItem.title}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="container-button" onClick={handleChangeButton}>
                    <button className="container-button-btn" >{viewMore ? "VER MENOS" : "VER MÁS"}</button>
                    <img className="container-button-icon" src={viewMore ? arrowUp : arrowDown} alt="arrowDownIcon" />
                </div>
            </div>
        </>
    )
}

export default App
