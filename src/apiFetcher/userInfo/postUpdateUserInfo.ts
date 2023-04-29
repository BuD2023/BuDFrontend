import customAxios from '../customAxios';

const postUserInfoEditAxios = async (token: string, data: FormData) => {
  return await customAxios({
    method: 'post',
    url: `/member/modifyInfo`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
};

export default postUserInfoEditAxios;
