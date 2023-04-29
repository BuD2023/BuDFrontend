import customAxios from '../customAxios';

export const postQnaAnswerAxios = async (token: string, answerPost: FormData) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: answerPost,
  });
};
