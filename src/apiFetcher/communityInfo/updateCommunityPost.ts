import customAxios from '../customAxios';

export interface INewCommunityPostType {
  title: string;
  content: string;
  images?: null | FormData;
  postType: string;
}

const updateCommunityPostAxios = async (token: string, postData: INewCommunityPostType) => {
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
