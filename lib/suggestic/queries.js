export const getRestaurantByID = async (id) => {
  const query = `query restaurantByID($id:ID!){
	restaurant(id:$id){
      name
      databaseId
      address1
      cityTown
      stateProvince
      country
      phone
      websiteUrl
      location
      businessType
      priceRating
      yelpRating
    }
}`;

  const restaurant = await fetch("https://production.suggestic.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables: { id } }),
    headers: {
      Authorization: "Token 9513eff49fa7a52095ce06843fdbbb65fbcef1f5",
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

  const menuItems = await fetch("https://production.suggestic.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables: { id } }),
    headers: {
      Authorization: "Token 9513eff49fa7a52095ce06843fdbbb65fbcef1f5",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((e) => console.error(e));

  return menuItems;
}
