import customAxios from '../customAxios';

export const postQnaAnswerAxios = async (token: string, answerPost: FormData) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
    data: answerPost,
  });
};
