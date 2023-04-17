import customAxios from '../customAxios';

const deleteCommentAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/comments/${postId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default deleteCommentAxios;
