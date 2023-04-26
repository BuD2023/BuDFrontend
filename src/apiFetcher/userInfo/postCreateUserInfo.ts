import customAxios from '../customAxios';

const postCreateUserInfoAxios = async (data: FormData) => {
  return await customAxios({
    method: 'post',
    url: `/addInfo`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
};

export default postCreateUserInfoAxios;
