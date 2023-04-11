import customAxios from '../customAxios';

const getSearchChatroomListAxios = async (token: string, keyword: string = '', page: number = 0) => {
  return await customAxios({
    method: 'get',
    url: `/chatroom/search?keyword=${keyword}&page=${page}}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
};

export default getSearchChatroomListAxios;
