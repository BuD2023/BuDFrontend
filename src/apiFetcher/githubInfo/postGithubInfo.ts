import customAxios from '../customAxios';

const postGithubInfo = async (token: string) => {
  return await customAxios({
    method: 'post',
    url: '/github',
    headers: {
      Authorization: token,
    },
  });
};

export default postGithubInfo;
