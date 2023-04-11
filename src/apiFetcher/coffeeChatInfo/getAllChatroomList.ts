import customAxios from '../customAxios';

const getAllChatroomList = async (token: string, page: number = 0) => {
  return await customAxios({
    method: 'get',
    url: `/chatroom/?page=${String(page)}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default getAllChatroomList;
