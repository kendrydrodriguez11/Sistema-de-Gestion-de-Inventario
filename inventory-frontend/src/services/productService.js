import api from './api';
import {jwtDecode} from 'jwt-decode';

const productService = {
  async getAllProducts(page = 0, size = 10) {
    const response = await api.get('/api/inventory/products', {
      params: { page, size },
    });
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/api/inventory/products/${id}`);
    return response.data;
  },

  async createProduct(productData, bucketName = 'my-inventory-bucket') {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.idUser;

    const response = await api.post('/api/inventory/products', productData, {
      params: { bucketName },
      headers: {
        'X-User-Id': userId,
      },
    });
    return response.data;
  },

  async updateProduct(id, productData) {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.idUser;

    const response = await api.put(`/api/inventory/products/${id}`, productData, {
      headers: {
        'X-User-Id': userId,
      },
    });
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/api/inventory/products/${id}`);
    return response.data;
  },

  async searchProducts(keyword, page = 0, size = 10) {
    const response = await api.get('/api/inventory/products/search', {
      params: { keyword, page, size },
    });
    return response.data;
  },

  async getLowStockProducts(page = 0, size = 10) {
    const response = await api.get('/api/inventory/products/low-stock', {
      params: { page, size },
    });
    return response.data;
  },

  async getProductsByCategory(category, page = 0, size = 10) {
    const response = await api.get(`/api/inventory/products/category/${category}`, {
      params: { page, size },
    });
    return response.data;
  },

  async uploadImage(uploadUrl, file) {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    return response.ok;
  },
};

export default productService;