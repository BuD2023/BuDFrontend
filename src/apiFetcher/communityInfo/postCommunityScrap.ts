import customAxios from '../customAxios';

const postCommunityScrapAxios = async (token: string, postId: number) => {
  return await customAxios({
    method: 'post',
    url: `/posts/${postId}/scrap`,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      charset: 'utf-8',
    },
  });
};

export default postCommunityScrapAxios;
