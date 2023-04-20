import customAxios from '../customAxios';

const updateCommunityPostAxios = async (token: string, postData: FormData) => {
  return await customAxios({
    method: 'post',
    url: '/posts/update',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: postData,
  });
};

export default updateCommunityPostAxios;
