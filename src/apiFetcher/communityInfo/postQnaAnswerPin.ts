import customAxios from '../customAxios';

export const getQnaAnswerPinAxios = async (token: string, answerId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/${answerId}/pin`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default getQnaAnswerPinAxios;
