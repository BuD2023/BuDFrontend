import customAxios from '../customAxios';

const getCommentAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/comments/${postId}/like`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default getCommentAxios;
