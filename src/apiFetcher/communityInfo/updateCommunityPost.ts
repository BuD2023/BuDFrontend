import customAxios from '../customAxios';

const updateCommunityPostAxios = async (token: string, postData: FormData, postId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: postData,
  });
};

export default updateCommunityPostAxios;
