import { PROXY_URL, PROXY_KEY } from "./apiConfig.js";
const GROUP_NUMBER = 69;

// Generalized API request function
function apiRequest(endpoint, params = {}, transformResponse) {
  const url = new URL(`${PROXY_URL}${endpoint}`);
  url.search = new URLSearchParams(params).toString();

  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-DH2642-Key': PROXY_KEY,
      'X-DH2642-Group': GROUP_NUMBER,
    },
  };

  return fetch(url, fetchOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => (transformResponse ? transformResponse(data) : data))
    .catch(error => {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    });
}

// Specific functions using the generalized apiRequest function

export function searchDishes(searchParams) {
  return apiRequest('/recipes/complexSearch', searchParams, data => data.results || []);
}

export function getMenuDetails(ids_array) {
  const params = { ids: ids_array.join(',') };
  return apiRequest('/recipes/informationBulk', params);
}

export function getDishDetails(id) {
  return getMenuDetails([id]).then(results => results[0]);
}

export function searchByIngredients(ingredientsArray) {
  const params = {
    ingredients: ingredientsArray.join(','),
    number: 10,
  };
  return apiRequest('/recipes/findByIngredients', params);
}

export function fetchIngredientSuggestions(input) {
  const params = {
    query: input,
    number: 10,
  };
  return apiRequest('/food/ingredients/autocomplete', params, data =>
    Array.isArray(data) ? data.map(item => item.name) : []
  ).catch(error => {
    // Return an empty array in case of error
    return [];
  });
}
