import customAxios from '../customAxios';

export const deleteFeedCommentPinAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/${postId}/comments/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export const deleteQnACommentPinAxios = async (token: string, answerId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/qna-answers/${answerId}/qna-comments/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
