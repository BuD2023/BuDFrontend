import customAxios from '../customAxios';

export const postCommentReplyAxios = async (token: string, commentId: number, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/posts/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export default postCommentReplyAxios;
