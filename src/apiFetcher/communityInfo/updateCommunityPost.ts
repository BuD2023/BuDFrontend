import customAxios from '../customAxios';

export interface UpdateCommunityPostType {
  title: string;
  content: string;
  images?: null | FormData;
  postType: string;
  postId: string;
}

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
