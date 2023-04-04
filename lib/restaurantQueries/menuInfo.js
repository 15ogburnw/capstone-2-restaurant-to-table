import { compareTwoStrings } from "string-similarity";

const suggesticURL = process.env.SUGGESTIC_URL;
const suggesticKey = process.env.SUGGESTIC_API_KEY;

export async function restaurantWithMenuInfo(restaurantObj) {
  // rearrange format of google restaurant object to include html attributions text
  // with main info
  let restaurant = restaurantObj.result;
  restaurant.html_attributions = restaurantObj.html_attributions;
  const googleName = restaurant.name;

  // extract latitude and longitude, then build suggestic query based on location
  const lat = restaurant.geometry.location.lat;
  const lon = restaurant.geometry.location.lng;

  const restaurantQuery = `query getRestaurantMenu( $lat:Float!, $lon:Float!, $dist:Int){
    restaurantSearch( lat:$lat, lon:$lon, distance:$dist, first:20){
      edges{
        node{
          name
          databaseId
        } 
      }
    }
  }`;

  //fetch raw query data from suggestic
  const resp = await fetch(suggesticURL, {
    method: "POST",
    body: JSON.stringify({
      query: restaurantQuery,
      variables: { lat, lon, dist: 10 },
    }),
    headers: {
      Authorization: `Token ${suggesticKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.restaurantSearch.edges)
    .catch((e) => console.error(e));

  //sort results of the suggestic query based on similarity of
  // name from Google results vs name from suggestic results
  const sorted = resp.sort((a, b) => {
    const aVal = compareTwoStrings(googleName, a.node.name);
    const bVal = compareTwoStrings(googleName, b.node.name);

    if (aVal > bVal) return -1;
    if (aVal < bVal) return 1;
    return 0;
  });

  let menu = [];
  if (compareTwoStrings(googleName, sorted[0].node.name) > 0.55) {
    menu = await getMenuByRestaurantId(sorted[0].node.databaseId);
  }
  restaurant.menu = menu.length > 0 ? menu : null;
  return restaurant.menu ? restaurant : null;
}

export async function getMenuByRestaurantId(id) {
  // Create a query for the suggestic database that gets the menu
  // information for a restaurant, provided the restaurant's databaseId
  const query = `query getMenuById($id:String!){
    menuitems(restaurantId:$id){
      name
      courses
      description
      type
      menu
      sectionName
      isActive
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

// WILL I NEED THIS ???

// export const getRestaurantByID = async (id) => {
//   const query = `query restaurantByID($id:ID!){
// 	restaurant(id:$id){
//       name
//       databaseId
//       location
//     }
//   }`;

//   const restaurant = await fetch(suggesticURL, {
//     method: "POST",
//     body: JSON.stringify({ query, variables: { id } }),
//     headers: {
//       Authorization: `Token ${suggesticKey}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => res.data.restaurant)
//     .catch((e) => console.error(e));

//   return restaurant;
// };
