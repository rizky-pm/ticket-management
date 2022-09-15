import axios from 'axios';

import { BASE_URL } from '../constants';

export const getAllEmployees = async (userSession) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/employees`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const addNewEmployee = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/employees`,
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

export const editEmployee = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/employees`,
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

export const deleteEmployee = async (id, userSession) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/employees/${id}`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
