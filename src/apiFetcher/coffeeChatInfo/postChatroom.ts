import customAxios from '../customAxios';

const postChatroomAxios = async (token: string) => {
  return await customAxios({
    method: 'post',
    url: '/chatrooms',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export default postChatroomAxios;

// {
//   "title" : "챗지비티는 거짓말쟁이",
//   "description" : "챗지비티와 인공지능",
//   "hashTag" : [ "인공지능", "챗지비티", "ai" ]
// }
