import axios from 'axios';

import { BASE_URL } from '../constants';

export const getAllProducts = async (userSession) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/products`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id, userSession) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/products/${id}`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const addNewProduct = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/products`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
      data: payload,
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const editProduct = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/products`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
      data: payload,
    });

    return res;
  } catch (error) {
    return error;
  }
};
