import axios from 'axios';

import { BASE_URL } from '../constants';

export const getAttachment = async (fileId, user, setAttachment) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/files/${fileId}`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    });

    if (res.status === 200) {
      setAttachment(res.data);
    }
  } catch (error) {
    console.log(error);
  }
};
