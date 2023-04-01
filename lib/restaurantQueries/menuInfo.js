import { compareTwoStrings } from "string-similarity";

const suggesticURL = process.env.SUGGESTIC_URL;
const suggesticKey = process.env.SUGGESTIC_API_KEY;

export async function restaurantsWithMenuInfo(restaurantObj) {
  let restaurant = restaurantObj.result;
  restaurant.html_attributions = restaurantObj.html_attributions;
  const googleName = restaurant.name;

  const lat = restaurant.geometry.location.lat;
  const lon = restaurant.geometry.location.lng;

  const restaurantQuery = `query getRestaurantMenu( $lat:Float!, $lon:Float!){
    restaurantSearchByLocation( lat:$lat, lon:$lon){
      otherResults{
        name
        databaseId
      }
    }
  }`;

  const resp = await fetch(suggesticURL, {
    method: "POST",
    body: JSON.stringify({
      query: restaurantQuery,
      variables: { lat, lon },
    }),
    headers: {
      Authorization: `Token ${suggesticKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.restaurantSearchByLocation.otherResults)
    .catch((e) => console.error(e));

  console.log(resp[0]);

  const sorted = resp.sort((a, b) => {
    console.log(a.name, b.name, googleName);
    const aVal = compareTwoStrings(googleName, a.name);

    const bVal = compareTwoStrings(googleName, b.name);

    if (aVal > bVal) return 1;
    if (aVal < bVal) return -1;
    return 0;
  });

  console.log(sorted[0]);

  const menu = await getMenuByRestaurantId(sorted[0].databaseId);
  restaurant.menu = menu.length > 0 ? menu : null;
  return restaurant.menu ? restaurant : null;
}

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
    .then((res) => res.data.menuitems)
    .catch((e) => console.error(e));

  return menuItems;
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
