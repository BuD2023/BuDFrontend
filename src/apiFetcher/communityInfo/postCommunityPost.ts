import customAxios from '../customAxios';

const postCommunityPostAxios = async (token: string, postData: FormData) => {
  return await customAxios({
    method: 'post',
    url: '/posts',
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: postData,
  });
};

export default postCommunityPostAxios;
