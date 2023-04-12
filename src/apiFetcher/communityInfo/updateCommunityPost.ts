import customAxios from '../customAxios';

export interface INewCommunityPostType {
  title: string;
  content: string;
  imageUrl: string[];
  postType: string;
}

const updateCommunityPostAxios = async (token: string, postData: INewCommunityPostType) => {
  return await customAxios({
    method: 'post',
    url: '/posts/update',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: postData,
  });
};

export default updateCommunityPostAxios;
