import axios from 'axios';

import { BASE_URL } from '../constants';

export const getComments = async (setComments, id, user) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/comments/tickets/${id}`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    });

    if (res.status === 200) {
      setComments(res.data.datas);
    }
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (
  user,
  setComment,
  setComments,
  getComments,
  id,
  payload
) => {
  console.log(user);

  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/comments`,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      data: {
        headerId: payload.headerId,
        commentText: payload.commentText,
        fileName: payload.fileName,
        fileExt: payload.fileExt,
      },
    });

    if (res.status === 201) {
      setComment('');
      getComments(setComments, id, user);
    }
  } catch (error) {
    console.log(error);
  }
};
