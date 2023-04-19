import customAxios from '../customAxios';

export const getFeedCommentPinAxios = async (token: string, postId: number) => {
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

export const getQnACommentPinAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/qna-comments/${postId}/pin`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
