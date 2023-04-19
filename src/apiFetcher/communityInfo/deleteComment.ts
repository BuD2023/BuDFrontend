import customAxios from '../customAxios';

export const deleteFeedCommentAxios = async (token: string, postId: number) => {
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

export const deleteQnACommentAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/qna-answers/qna-comments/${postId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
