import customAxios from '../customAxios';

const postIsIdUniqueAxios = async (token: string, data: string) => {
  return await customAxios({
    method: 'post',
    url: `/checkNickname`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export default postIsIdUniqueAxios;
