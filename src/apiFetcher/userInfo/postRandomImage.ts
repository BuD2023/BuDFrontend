import customAxios from '../customAxios';

const postRandomImageAxios = async (token: string) => {
  return await customAxios({
    method: 'post',
    url: `/member/random-image`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default postRandomImageAxios;
