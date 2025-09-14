import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constants";


const tripService = {
    create: async (tripData) => {
        try{
            const response = await api.post(API_ENDPOINTS.TRIPS, tripData);
            console.log("trip created", tripData);
    
            return response.data;
        }catch(error){
            console.error("Error creating trip", error);
             throw error;
        }
    },

     getAll: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.TRIPS);
            console.log("Full response", response);

            return response;
        }catch (error){
             console.error('Error fetching a Trip:', error);
            throw error;

        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`${API_ENDPOINTS.TRIPS}${id}`)
             console.log("Full API response:", response);  
        console.log("ELD logs:", response);  
            return response;
        }catch (error){
             console.error('Error fetching a Trip:', error);
            throw error;

        }
    }
}


export default tripService