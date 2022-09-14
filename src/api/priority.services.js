import axios from 'axios';

import { BASE_URL } from '../constants';

export const getAllPriorities = async (userSession) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/priorities`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const getPriorityById = async (userSession, id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/priorities/${id}`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};

export const addNewPriority = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/priorities`,
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

export const editPriority = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${BASE_URL}/priorities`,
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

export const deletePriority = async (id, userSession) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/priorities/${id}`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
};
