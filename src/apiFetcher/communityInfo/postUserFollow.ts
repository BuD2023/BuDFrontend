import customAxios from '../customAxios';

const postUserFollow = async (token: string, id: number) => {
  return await customAxios({
    method: 'post',
    url: `/users/${id}/follows`,
    headers: {
      Authorization: token,
    },
  });
};

export default postUserFollow;
