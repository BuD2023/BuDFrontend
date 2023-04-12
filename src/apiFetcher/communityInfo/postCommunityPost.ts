import customAxios from '../customAxios';

export interface INewCommunityPostType {
  title: string;
  content: string;
  images?: null | FormData;
  postType: string;
}

const postCommunityPostAxios = async (token: string, postData: INewCommunityPostType) => {
  return await customAxios({
    method: 'post',
    url: '/posts',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
    data: postData,
  });
};

export default postCommunityPostAxios;