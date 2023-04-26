import customAxios from '../customAxios';

export const putCommentEditAxios = async (token: string, commentId: number, comment: string) => {
  return await customAxios({
    method: 'put',
    url: `/posts/comments/${commentId}/modify`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export default putCommentEditAxios;
