import customAxios from '../customAxios';

const postCreateUserInfoAxios = async (token: string, data: FormData) => {
  return await customAxios({
    method: 'post',
    url: `/addInfo`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    data: data,
  });
};

export default postCreateUserInfoAxios;
