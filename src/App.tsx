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

    useEffect(() => {
        const importDataApi = async () => {
            try {
                const response = await axios.get('https://api.jsonbin.io/v3/b/63654b012b3499323bf58225')
                if (response) {
                    setNews(response.data?.record?.notes)
                }
            } catch (error) {
                console.error(error)
            }
        }
        importDataApi()
    }, [])

    return (
        <>
        </>
    )
}

export default App
