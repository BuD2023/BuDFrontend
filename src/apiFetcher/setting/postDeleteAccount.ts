import customAxios from '../customAxios';

const postDeleteAccountAxios = async (token: string) => {
  return await customAxios({
    method: 'post',
    url: `/member/withdraw`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default postDeleteAccountAxios;
