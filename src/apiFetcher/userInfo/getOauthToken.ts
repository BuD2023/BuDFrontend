import customAxios from '../customAxios';

const getOauthTokenAxios = async () => {
  return await customAxios({
    method: 'get',
    url: `/users`,
  });
};

export default getOauthTokenAxios;
