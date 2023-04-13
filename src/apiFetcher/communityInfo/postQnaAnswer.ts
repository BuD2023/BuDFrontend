import customAxios from '../customAxios';

export interface QnaAnswerType {
  postId: number;
  content: string;
}

export const postQnaAnswerAxios = async (token: string, answerPost: QnaAnswerType) => {
  return await customAxios({
    method: 'post',
    url: `/posts/answer`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: answerPost,
  });
};
