import customAxios from '../customAxios';

export const postFeedCommentReplyAxios = async (token: string, commentId: number, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/posts/comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: comment,
  });
};

export const postQnaCommentReplyAxios = async (token: string, commentId: number, comment: string) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/qna-comments/${commentId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: { content: comment },
  });
};
