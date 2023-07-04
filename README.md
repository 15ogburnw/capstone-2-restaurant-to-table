# Restaurant To Table

## Description

Restuarant to Table is a Next.js project styled with TailwindCSS and originally bootstrapped via [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Restaurant to Table is a user-focused web application that leverages the power of the Edamam Recipe search API to provide users with a platform to discover new recipes based on their specific diet and health restrictions. Users can also filter recipes by cuisine type, meal type (main course/side/etc.), and dish type (breakfast/lunch/dinner), allowing for a more personalized recipe browsing experience. Additionally, users can save recipes for future reference or add them to their favorites list. The app also enables users to create custom menus, making it easy to plan meals in advance.

## Features

- Recipe Search: Users can search for recipes using keywords and receive customized results based on their specified diet and health restrictions.
- Advanced Filters: Users can filter recipes by cuisine type, meal type, and dish type to further narrow down their search focus.
- Save and Favorite: Users can save recipes for later reference and add them to their favorites list for quick access.
- Custom Menus: Users can create custom menus by selecting recipes from their saved recipes,favorites list, or the search function, helping them plan meals in advance.

## Technologies Used

- [Next.js](https://nextjs.org/): Next.js is a React framework that enables server-side rendering, static site generation, and more. It provides an efficient development experience and excellent performance for building modern web applications.

- [Node.js](https://nodejs.org/en): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable and high-performance applications on the server-side.

- [TailwindCSS](https://tailwindcss.com/): Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined utility classes to rapidly build user interfaces. It allows for easy customization and efficient development.

- [Supabase](https://supabase.com/): Supabase is an open-source alternative to Firebase. It is a cloud-based platform that provides a set of tools and services for building backend applications. Supabase simplifies database management, authentication, and real-time data synchronization.

## Installation

To run this application locally, follow these steps:

1. Clone the repository: `git clone [repository_url]`
2. Navigate to the project directory: `cd [project_directory]`
3. Install dependencies: `yarn install`
4. Configure environment variables: Create a `.env.local` file in the root directory of the project and add the necessary environment variables:

```
# Example .env file
ENV_VARIABLE1=example_value1
ENV_VARIABLE2=example_value2
```

5. Start the development server: `yarn dev`
6. Open your web browser and visit `http://localhost:3000` to access the application.

## Configuration

The application requires the following environment variables to be properly configured:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: [Public key with Anonymous level access to your Supabase Database]
- `NEXT_PUBLIC_SUPABASE_URL`: [The Public access endpoint for your Supabase Database]
- `EDAMAM_APP_ID`: [The application ID for your Edamam API Access account]
- `EDAMAM_API_KEY`: [The API key for your Edamam API Access acccount]

Ensure that these environment variables are set with the appropriate values either in the `.env.local` file or your hosting environment.

## Usage

1. Register a account with Supabase and with the Edamam Recipe Search API.
2. Update the `.env.local` file with your application's values.
3. Launch the application and deploy it to Vercel.
4. Create an account on the Restaurant to Table Website
5. Log in to your account.
6. Use the search bar to enter keywords and filter recipes based on your diet and health restrictions.
7. Explore the search results and click on a recipe to view its details.
8. Save recipes for later reference or add them to your favorites list.
9. Create custom menus by selecting recipes from your saved recipes or favorites list.
10. Access your saved recipes, favorites list, and custom menus through the respective navigation tabs.

## Contributing

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes
4. Commit your changes: `git commit -m "Add some feature"`
