import customAxios from '../customAxios';

export const postCommentAxios = async (token: string, postId: number, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/posts/${postId}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export default postCommentAxios;
