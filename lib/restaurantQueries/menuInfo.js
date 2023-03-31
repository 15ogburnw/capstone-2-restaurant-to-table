
import { compareTwoStrings } from "string-similarity";

const suggesticURL = process.env.SUGGESTIC_URL
const suggesticKey = process.env.SUGGESTIC_API_KEY


export async function getMenuInfoForExactLocation(name, lat, lon){
  const restaurantQuery = `query getRestaurantMenu($name:String, $lat:Float!, $lon:Float!){
    restaurantSearchByLocation(query:$name, lat:$lat, lon:$lon){
      otherResults{
        name
        location
        databaseId
      }
    }
  }`

  const restaurant = await fetch(suggesticURL, {
    method: "POST",
    body: JSON.stringify({ query:restaurantQuery, variables: { query:name, lat, lon } }),
    headers: {
      Authorization: `Token ${suggesticKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.restaurantSearchByLocation.otherResults[0])
    .catch((e) => console.error(e));

  const restaurantName = restaurant.name

  if(compareTwoStrings(name,restaurantName)>=0.8){
    const menu = await getMenuById(restaurant.databaseId);
    return menu;
  }else {
    return null
  }
  
}

export const getRestaurantByID = async (id) => {
  const query = `query restaurantByID($id:ID!){
	restaurant(id:$id){
      name
      databaseId
      location
    }
}`;

  const restaurant = await fetch(suggesticURL, {
    method: "POST",
    body: JSON.stringify({ query, variables: { id } }),
    headers: {
      Authorization: `Token ${suggesticKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.restaurant)
    .catch((e) => console.error(e));

  return restaurant;
};

export async function getMenuByRestaurantId(id) {
  const query = `query getMenuById($id:String!){
    menuitems(restaurantId:$id){
      name
      courses
      description
      type
      menu
      sectionName
    }
  }`;

  const menuItems = await fetch(suggesticURL, {
    method: "POST",
    body: JSON.stringify({ query, variables: { id } }),
    headers: {
      Authorization: `Token ${suggesticKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((e) => console.error(e));

  return menuItems;
}
