import customAxios from '../customAxios';

export const postFeedCommentPinAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/comments/${postId}/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export const postQnACommentPinAxios = async (token: string, commentId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/qna-comments/${commentId}/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
