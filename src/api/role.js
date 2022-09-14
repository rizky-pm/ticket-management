import axios from 'axios';

import { BASE_URL } from '../constants';

export const getAllRoles = async (setIsFetching, setRoles, userSession) => {
  setIsFetching(true);
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/roles`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    setIsFetching(false);

    if (res.status === 200) {
      setRoles(res.data.datas);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addNewRole = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/roles`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
      data: payload,
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
