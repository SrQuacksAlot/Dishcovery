import { PROXY_URL, PROXY_KEY } from "./apiConfig.js";
const GROUP_NUMBER = 69;

export function searchDishes(searchParams) {


    // Construct the URL and use URLSearchParams for encoding
    const url = new URL(`${PROXY_URL}/recipes/complexSearch`);
    const queryString = new URLSearchParams(searchParams).toString();
    url.search = `?${queryString}`;

    // Define the fetch options as a simple object
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY,
            'X-DH2642-Group': GROUP_NUMBER,
        }
    };

    // Handle HTTP response status
    function checkResponseStatusACB(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    // Parse the fetched data to return only the 'results' array
    function parseResultsACB(data) {
        return data.results || [];
    }

    // Handle errors
    function handleFetchErrorACB(error) {
        console.error("Error fetching dishes:", error);
        throw error;
    }

    // Fetch with promise chaining and named ACBs for clarity
    return fetch(url, fetchOptions)
        .then(checkResponseStatusACB)
        .then(parseResultsACB)
        .catch(handleFetchErrorACB);
}


// Function to fetch menu details for multiple dish IDs
export function getMenuDetails(ids_array) {


    // Construct the URL and query string using the correct endpoint and parameter name
    const url = new URL(`${PROXY_URL}/recipes/informationBulk`); // (╯°□°)╯︵ ┻━┻
    const queryString = new URLSearchParams({ ids: ids_array }).toString();
    url.search = `?${queryString}`;

    // Define the fetch options with HTTP headers (same as searchDishes)
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY,
            'X-DH2642-Group': GROUP_NUMBER,
        }
    };

    // ACB to check the HTTP response status
    function checkResponseStatusACB(response) {
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    // Fetch with promise chain
    return fetch(url, fetchOptions).then(checkResponseStatusACB);
}

export function getDishDetails(id) {
    // ACB to convert array result to single object 
    function justTheTipACB(array) {return array[0];}

    // Call getMenuDetails with the ID in an array, then transform result
    return getMenuDetails([id]).then(justTheTipACB);
}

export function searchByIngredients(ingredientsArray) {


    // Construct the URL for the ingredient-based search endpoint
    const url = new URL(`${PROXY_URL}/recipes/findByIngredients`);
    const queryString = new URLSearchParams({
        ingredients: ingredientsArray.join(','), // API expects a comma-separated list
        number: 10, // Adjust the number of results as needed
    }).toString();
    url.search = `?${queryString}`;

    // Define the fetch options with HTTP headers
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY,
            'X-DH2642-Group': GROUP_NUMBER,
        }
    };

    // Handle HTTP response status
    function checkResponseStatusACB(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    // Parse and return the fetched data
    function parseResultsACB(data) {
        return data || []; // Return the entire response, assuming it's an array of recipes
    }

    // Handle errors
    function handleFetchErrorACB(error) {
        console.error("Error fetching recipes by ingredients:", error);
        throw error;
    }

    // Fetch with promise chaining
    return fetch(url, fetchOptions)
        .then(checkResponseStatusACB)
        .then(parseResultsACB)
        .catch(handleFetchErrorACB);
}

export function fetchIngredientSuggestions(input) {
    // Construct the URL for the autocomplete endpoint
    const url = new URL(`${PROXY_URL}/food/ingredients/autocomplete`);
    const queryString = new URLSearchParams({
      query: input,
      number: 10, // Adjust as needed
    }).toString();
    url.search = `?${queryString}`;
  
    // Define the fetch options with HTTP headers
    const fetchOptions = {
      method: 'GET',
      headers: {
        'X-DH2642-Key': PROXY_KEY,
        'X-DH2642-Group': GROUP_NUMBER,
      }
    };

    // Fetch suggestions
    return fetch(url, fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Ensure we return an array of names, or an empty array if no results
        return Array.isArray(data) ? data.map(item => item.name) : [];
      })
      .catch(error => {
        console.error("Error fetching ingredient suggestions:", error);
        return []; // Return an empty array in case of error
      });
}
