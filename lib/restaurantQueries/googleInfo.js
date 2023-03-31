
const key = process.env.GOOGLE_PLACES_API_KEY;
import { getMenuInfoForExactLocation } from "./menuInfo";

export const getIdsFromSearch = async (name,lat,lon,radius) => {
    const baseURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"

    let params = new URLSearchParams({
        input:name,
        inputtype:'textquery',
        locationbias:`circle:${radius}@${lat},${lon}`,
        fields:["place_id","business_status"],
        language:'en',
        key
    })

    let fullURL = new URL(baseURL+params.toString()).toString();
    const restaurants = await fetch(fullURL).then((res)=>res.json()).then((res)=>res.candidates).catch((e)=>console.error(e));
    
    return restaurants
}

export default async function getRestaurantSearchResults(name, lat, lon, radius){
    const restaurantIds = await getIdsFromSearch(name, lat, lon, radius)
    
    const baseURL = "https://maps.googleapis.com/maps/api/place/details/json?"
    let params = new URLSearchParams({
        input:name,
        inputtype:'textquery',
        locationbias:`circle:${radius}@${lat},${lon}`,
        fields:["place_id","formatted_address","icon","icon_background_color","name","photo","formatted_phone_number","website","editorial_summary"],
        language:'en',
        key
    });
    const fullURL = new URL(baseURL+params.toString()).toString();
    
    const resolvePromisesSeq = async (restaurants) => {
        const results = [];
        for (const restaurant of restaurants) {
          results.push(await restaurant);
        }
      
        return results;
    };
    
    let restaurantsInfo = [];
    for (let Id of restaurantIds){
        if (Id.business_status === "OPERATIONAL"){
            restaurantsInfo.push(fetch(fullURL).then((res)=>res.json())).catch((e)=>{console.log(e); return undefined})
        }
    }

    const restaurants = await resolvePromisesSeq(restaurantsInfo)

    // TODO FILTER THESE RESULTS
    const finalResults = restaurants.filter((restaurant)=>{
        return true;
    })

    return finalResults;
}