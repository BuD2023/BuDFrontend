import customAxios from '../customAxios';

export const postQnaAnswerLikeAxios = async (token: string, answerId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/qna-answers/${answerId}/like`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

export default postQnaAnswerLikeAxios;
