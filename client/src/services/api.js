import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const res = await axios.get('/api/products'); 
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};
