import customAxios from '../customAxios';

export const getQnaAnswerAxios = async (token: string, postId: number): Promise<any> => {
  return await customAxios({
    method: 'get',
    url: `/posts/qna-answers?postId=${postId}&page=0`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
