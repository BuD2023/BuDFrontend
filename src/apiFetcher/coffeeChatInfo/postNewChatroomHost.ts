import customAxios from '../customAxios';

const postNewChatroomHostAxios = async (token: string, chatroomId: number, userId: number) => {
  const response = await customAxios({
    method: 'post',
    url: `/chatrooms/${chatroomId}/users/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response;
};

export default postNewChatroomHostAxios;
