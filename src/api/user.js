import axios from 'axios';

import { BASE_URL } from '../constants';

export const getAllUsers = async (setIsFetching, setUsers, userSession) => {
  setIsFetching(true);
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/users`,
      headers: {
        Authorization: `Bearer ${userSession.data.token}`,
      },
    });

    setIsFetching(false);

    if (res.status === 200) {
      setUsers(res.data.datas);
    }
  } catch (error) {
    setIsFetching(false);
    console.log(error);
  }
};
