import axios from 'axios';

import { BASE_URL } from '../constants';

export const getTickets = async (setIsFetching, setData, user) => {
  setIsFetching(true);
  try {
    const response = await axios({
      method: 'get',
      url: BASE_URL + '/tickets',
      headers: {
        authorization: `Bearer ${user.data.token}`,
      },
    });

    setIsFetching(false);

    if (response.status === 200) {
      setData(response.data.datas);
    }
  } catch (error) {
    setIsFetching(false);
    console.error(error);
  }
};

export const getTicket = async (setIsFetching, setData, id, user) => {
  setIsFetching(true);

  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/tickets/${id}`,
      headers: {
        authorization: `Bearer ${user.data.token}`,
      },
    });

    setIsFetching(false);

    if (response.status === 200) {
      setData(response.data.data);
    }
  } catch (error) {
    setIsFetching(false);
    console.error(error);
  }
};

export const updateTicketStatus = async (user, payload) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${BASE_URL}/tickets`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      data: payload,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
