import customAxios from '../customAxios';

const postIsIdUniqueAxios = async (token: string, data: string): Promise<boolean> => {
  return await customAxios({
    method: 'get',
    url: `/checkNickname?nickname=${data}`,
    headers: {
      Authorization: token,
    },
  });
};

export default postIsIdUniqueAxios;
