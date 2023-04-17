import customAxios from '../customAxios';

const getCommentPinAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/comments/${postId}/pin`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default getCommentPinAxios;
