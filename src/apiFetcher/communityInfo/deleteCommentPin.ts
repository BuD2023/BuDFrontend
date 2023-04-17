import customAxios from '../customAxios';

const deleteCommentPinAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/${postId}/comments/pin`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default deleteCommentPinAxios;
