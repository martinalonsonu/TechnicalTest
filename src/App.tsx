import axios from "axios"
import { useEffect, useState } from "react"

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

    useEffect(() => {
        const importDataApi = async () => {
            try {
                const response = await axios.get('https://api.jsonbin.io/v3/b/63654b012b3499323bf58225')
                if (response) {
                    const data: NewsApi[] = response.data?.record?.notes
                    viewMore ? setNews(data) : setNews(data.slice(0, 5))
                }
            } catch (error) {
                console.error(error)
            }
        }
        importDataApi()
    }, [viewMore])

    const handleChangeButton = () => {
        setViewMore(!viewMore)
    }

    console.log(news)
    return (
        <div style={{ width: '100vw', height: '100vh', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '300px', minHeight: '300px', border: '1px solid black' }}>
                <h1>ÚLTIMAS NOTICIAS</h1>
                {news.length > 0 && (
                    news?.map((newItem: NewsApi) => (
                        <div key={newItem.id}>
                            <p>. {newItem.title}</p>
                        </div>
                    ))
                )}
                <button onClick={handleChangeButton}>{viewMore ? "Ver menos" : "Ver más"}</button>
            </div>
        </div>
    )
}

export default App
