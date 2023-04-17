import customAxios from '../customAxios';

const getCommentAxios = async (token: string, page: number = 0, postId: number) => {
  return await customAxios({
    method: 'get',
    url: `/posts/${postId}/comments?page=${page}&`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default getCommentAxios;
