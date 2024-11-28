import { PROXY_URL, PROXY_KEY } from "./apiConfig.js";

export function searchDishes(searchParams) {
    const GROUP_NUMBER = 69;

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
    const GROUP_NUMBER = 69;

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