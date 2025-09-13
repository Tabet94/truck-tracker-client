import api from "../Utils/api";
import { API_ENDPOINTS } from "../Utils/constants";


const tripService = {
    create: async (tripData) => {
        try{
            const response = await api.post(API_ENDPOINTS.TRIPS, tripData);
            console.log("trip created", tripData);
             console.log("Trip route distance (km):", data.route.distance_km);
  console.log("Current location coords:", data.current_location.latitude, data.current_location.longitude);
            return response.tripdata;
        }catch(error){
            console.error("Error creating trip", error);
        }
    }
}


export default tripService