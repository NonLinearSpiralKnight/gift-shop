const API_URL = 'http://localhost:3000/api';

async function request(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    return [];
  }
}

const api = {
  getProducts() {
    return request('/products');
  },

  getProductById(id) {
    return request(`/products/${id}`);
  },
};
