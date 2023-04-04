const key = process.env.GOOGLE_PLACES_API_KEY;
import { restaurantWithMenuInfo } from "./menuInfo";
import queryString from "query-string";

export const getIdsFromSearch = async (
  name = "restaurant",
  lat,
  lon,
  radius = 10
) => {
  const baseURL =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";

  // convert radius from miles to meters
  radius = radius * 1609;

  //turn query parameters object into a URL encoded string
  let params = queryString.stringify(
    {
      input: name,
      inputtype: "textquery",
      locationbias: `circle:${radius}@${lat},${lon}`,
      fields: ["place_id", "business_status", "name"],
      language: "en",
      key,
    },
    {
      arrayFormat: "comma",
    }
  );

  let fullURL = baseURL + params;

  //   get a list of restaurant IDs along with the operational status of the restaurant
  const restaurantIDs = await fetch(fullURL)
    .then((res) => res.json())
    .then((res) => res.candidates)
    .catch((e) => console.error(e));

  return restaurantIDs;
};

export default async function getRestaurantSearchResults(
  name,
  lat,
  lon,
  radius
) {
  const restaurantIds = await getIdsFromSearch(name, lat, lon, radius);

  const baseURL = "https://maps.googleapis.com/maps/api/place/details/json?";

  //   resolves an array of passed promises
  const resolvePromisesSeq = async (restaurants) => {
    const results = [];
    for (const restaurant of restaurants) {
      try {
        let res = await restaurant;
        results.push(res);
      } catch (e) {
        console.log(e);
        results.push(null);
      }
    }

    return results;
  };

  let restaurantsInfo = [];

  //for each restaurant ID, check if the business is operational, then push a new fetch promise into the restaurantsInfo array,
  //   which we will resolve sequentially below
  for (let Id of restaurantIds) {
    if (Id.business_status === "OPERATIONAL") {
      let params = queryString.stringify(
        {
          place_id: Id.place_id,
          fields: [
            "place_id",
            "formatted_address",
            "geometry",
            "icon",
            "icon_background_color",
            "name",
            "photo",
            "formatted_phone_number",
            "website",
            "editorial_summary",
          ],
          language: "en",
          key,
        },
        {
          arrayFormat: "comma",
        }
      );
      let fullURL = baseURL + params;
      restaurantsInfo.push(fetch(fullURL).then((res) => res.json()));
    }
  }

  //   await the fetches for each restaurant ID
  const allRestaurants = await resolvePromisesSeq(restaurantsInfo);
  console.log("All Google Results", allRestaurants);

  // filters out null fields and leaves just valid restaurant objects, then maps new
  // array of promises for restaurants that have menu info through suggestic API
  let restaurantsWithMenus = allRestaurants
    .filter((restaurant) => restaurant)
    .map((restaurant) => {
      return restaurantWithMenuInfo(restaurant);
    });

  // resolve new array of promises and filter the invalid elements, then return
  const preliminaryResults = await resolvePromisesSeq(restaurantsWithMenus);
  const finalResults = preliminaryResults.filter((restaurant) => restaurant);

  console.log("All google results with suggestic menus", finalResults);

  return finalResults;
}
