import customAxios from '../customAxios';

export interface postChatroomData {
  title: string;
  description: string;
  hashTag?: string[];
}

const postChatroomAxios = async (token: string, data: postChatroomData) => {
  return await customAxios({
    method: 'post',
    url: '/chatrooms',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  });
};

export default postChatroomAxios;

// {
//   "title" : "챗지비티는 거짓말쟁이",
//   "description" : "챗지비티와 인공지능",
//   "hashTag" : [ "인공지능", "챗지비티", "ai" ]
// }
