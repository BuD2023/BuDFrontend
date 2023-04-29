import { postChatroomData } from '../../components/coffeeChat/_CoffeeChat.interface';
import customAxios from '../customAxios';

const postChatroomAxios = async (token: string, data: postChatroomData) => {
  return await customAxios({
    method: 'post',
    url: '/chatrooms',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: data,
  });
};

export default postChatroomAxios;
