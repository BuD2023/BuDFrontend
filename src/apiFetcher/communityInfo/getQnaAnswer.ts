import { QnaAnswerType } from '../../components/q&aDetail/_Q&ADetail.interface';
import customAxios from '../customAxios';

export const getQnaAnswerAxios = async (token: string, postId: number): Promise<QnaAnswerType> => {
  return await customAxios({
    method: 'get',
    url: `/posts/qna-answers?postId=${Number(postId)}&page=0`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
