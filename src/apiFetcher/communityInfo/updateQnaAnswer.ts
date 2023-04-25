import customAxios from '../customAxios';

export const updateQnaAnswerAxios = async (token: string, answerId: number, answerPost: FormData) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/${answerId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: answerPost,
  });
};
