import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const findImages = async (searchQuery, page) => {
  const searchRarams = new URLSearchParams({
    key: '40101841-4ad239ae4368ab22455fec4a5',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    q: searchQuery,
    page: page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${searchRarams}`);

  return response.data;
};
