import customAxios from '../customAxios';

export const postQnaAnswerPinAxios = async (token: string, answerId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/${answerId}/pin`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default postQnaAnswerPinAxios;
