import axios from 'axios';

import { BASE_URL } from '../constants';

export const getAllStatus = async (setIsFetching, setStatuses, userSession) => {
  setIsFetching(true);
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/status`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    setIsFetching(false);

    if (res.status === 200) {
      setStatuses(res.data.datas);
    }
  } catch (err) {
    console.log(err);
  }
};

export const postNewStatus = async (payload, userSession) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/status`,
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
