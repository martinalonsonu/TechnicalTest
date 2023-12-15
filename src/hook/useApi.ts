import axios from "axios"
import { Note, Root } from "../interfaces"

export const useApi = () => {
    const fetchApi = async () => {
        try {
            // usamos try-catch para un mejor manejo y control de errores y axios para hacer la petición
            const response: Root | undefined = await axios
                .get('https://api.jsonbin.io/v3/b/63654b012b3499323bf58225')
                .then(response => response.data)
            if (response) {
                //si existe una respuesta podemos almacenar nuestra retornamos los datos                
                const data: Note[] = response?.record.notes;
                return data
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { fetchApi }
}