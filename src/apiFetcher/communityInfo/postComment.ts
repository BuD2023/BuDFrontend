import customAxios from '../customAxios';

export const postFeedCommentAxios = async (token: string, postId: number, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/posts/${postId}/comments`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export const postQnaCommentAxios = async (token: string, answerId: number, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/${answerId}/qna-comments`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: { content: comment },
  });
};
