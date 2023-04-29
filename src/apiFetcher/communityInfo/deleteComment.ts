import customAxios from '../customAxios';

export const deleteFeedCommentAxios = async (token: string, commentId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export const deleteQnACommentAxios = async (token: string, commentId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/qna-answers/qna-comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
