import customAxios from '../customAxios';

const deleteQnaAnswerAxios = async (token: string, answerId: number) => {
  return await customAxios({
    method: 'delete',
    url: `/posts/qna-answers/${answerId}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default deleteQnaAnswerAxios;
