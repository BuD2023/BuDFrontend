import customAxios from '../customAxios';

export const putFeedCommentEditAxios = async (token: string, commentId: number, comment: string) => {
  return await customAxios({
    method: 'put',
    url: `/posts/comments/${commentId}/modify`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export const putQnaCommentEditAxios = async (token: string, commentId: number, comment: string) => {
  return await customAxios({
    method: 'put',
    url: `/posts/qna-answers/qna-comments/${commentId}/modify`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: { content: comment },
  });
};
