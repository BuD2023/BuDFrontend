import axios from 'axios';

import FooterMenu from '../components/common/FooterMenu';
import { accessToken } from '../main';

export default function Test3() {
  axios.defaults.withCredentials = true;

  const chatroomData = JSON.stringify({
    title: '이게 올라간다면?',
    description: '테스트용입니다',
    hashTag: ['인공지능', '챗지비티', 'ai'],
  });

  const communityData = JSON.stringify({
    title: 'title',
    content: 'content',
    // imageUrl: 'imageUrl',
    postType: 'FEED',
  });

  const githubLogin = async () => {
    window.location.assign('http://34.64.224.24:8080/oauth2/authorization/github ');
  };

  const fetchChatRoom = async () => {
    try {
      const response = await axios.get('api/chatrooms?page=0 ');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSearchedChatRoom = async () => {
    try {
      const response = await axios.get('api/chatrooms/search?keyword=test&page=0&size=5');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postChatroom = async () => {
    try {
      const response = await axios.post('api/chatrooms ', chatroomData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postCommunity = async () => {
    try {
      const response = await axios.post('api/posts', JSON.stringify(communityData), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // const postCommunity = async () => {
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: 'api/github',
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getGithub = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'api/github',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postGithub = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'api/github',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="relative mb-20 mt-9  flex  h-full  min-h-[calc(100vh-160px)]  w-full  flex-col  items-center  justify-center  gap-4  p-4">
        <button onClick={githubLogin}>깃허브 로그인하기</button>
        <button onClick={fetchChatRoom}>채팅방 get</button>
        <button onClick={fetchSearchedChatRoom}>채팅방 search</button>
        <button onClick={postChatroom}>채팅방 post</button>
        <button onClick={postCommunity}>커뮤니티 post</button>
        <button onClick={getGithub}>깃허브 get</button>
        <button onClick={postGithub}>깃허브 post</button>
      </div>
      <FooterMenu />
    </section>
  );
}
