import customAxios from '../customAxios';

const getSearchChatroomListAxios = async (token: string, keyword: string = '') => {
  return await customAxios({
    method: 'get',
    url: `/chatroom/search?keyword=${keyword}&page=0}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default getSearchChatroomListAxios;
