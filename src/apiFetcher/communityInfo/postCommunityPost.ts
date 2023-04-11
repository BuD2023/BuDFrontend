import customAxios from '../customAxios';

export interface INewCommunityPostType {
  title: string;
  content: string;
  imageUrl: string[];
  postType: string;
}

const postCommunityPostAxios = async (token: string, postData: INewCommunityPostType) => {
  return await customAxios({
    method: 'post',
    url: '/community/post',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: postData,
  });
};

export default postCommunityPostAxios;
