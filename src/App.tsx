import { Route, Routes, useNavigate } from 'react-router-dom';
import './firebase-messaging-sw.js';
import CoffeeChat from './pages/coffeeChat/CoffeeChat';
import MyProfile from './pages/profile/MyProfile';
import ChatRoom from './pages/coffeeChat/ChatRoom';
import NotFound from './pages/NotFound';
import NewsDetail from './pages/news/NewsDetail';
import Notification from './pages/notification/Notification';
import { useEffect, useLayoutEffect, useState } from 'react';
import LogInPage from './pages/SignUp/LogInPage';
import SetPicture from './components/SignUp/SetPicture';
import SetJob from './components/SignUp/SetJob';
import Home from './pages/home/Home.js';
import SignUp from './pages/SignUp/SignUp.js';
import News from './pages/news/News.js';
import Community from './pages/community/Community.js';
import CommunityQADetail from './pages/community/CommunityQADetail.js';
import CommunityFeedDetail from './pages/community/CommunityFeedDetail.js';
import PostCreate from './pages/community/PostCreate.js';
import PostEdit from './pages/community/PostEdit.js';
import QAAnswerEdit from './pages/community/QAAnswerEdit.js';
import QAAnswerCreate from './pages/community/QAAnswerCreate.js';
import RoomCreate from './pages/coffeeChat/RoomCreate.js';
import OtherProfile from './pages/profile/OtherProfile.js';
import MyProfileEdit from './pages/profile/MyProfileEdit.js';
import Setting from './pages/setting/Setting.js';
import UserInfo from './pages/setting/UserInfo.js';
import { RecoilRoot, useRecoilState } from 'recoil';
import { onMessage } from 'firebase/messaging';
import { firebaseMessaging } from './utils/fcm.js';
import { loginUserInfo } from './store/recoil/user.js';
import { useMyProfileQuery } from './store/module/useMyProfileQuery.js';
import { getAccessToken } from './utils/getAccessToken.js';

function App() {
  const $html = document.querySelector('html');

  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(loginUserInfo);
  const [rerender, setRerender] = useState(false);
  const logInStatus = localStorage.getItem('logInStatus');

  //테마 변경
  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      $html?.classList.add('dark');
    }
  }, []);

  // 토큰 설정
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    if (codeParams && localStorage.getItem('accessToken') === null) {
      getAccessToken(codeParams, setRerender, rerender);
    } else {
      const token = localStorage.getItem('accessToken');
      console.log(JSON.parse(token as string));
    }
    if (!user && logInStatus === 'false' && !logInStatus) navigate('logIn');
  }, []);

  // FCM 메시지 수신 이벤트 핸들링
  useEffect(() => {
    onMessage(firebaseMessaging, (payload: any) => {
      const title = payload.notification?.title;
      const options = {
        body: payload.notification?.body,
      };
      console.log('Message received. title : ', title, 'options : ', options);
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title as string, options);
      });
    });
  }, []);

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logIn" element={<LogInPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp/picture" element={<SetPicture />} />
        <Route path="/signUp/job" element={<SetJob />} />

        <Route path="/news" element={<News />} />
        <Route path="/newsDetail/:id" element={<NewsDetail />} />

        <Route path="/community/:filter" element={<Community />} />
        <Route path="/communityQADetail/:id" element={<CommunityQADetail />} />
        <Route path="/communityFeedDetail/:id" element={<CommunityFeedDetail />} />
        <Route path="/postCreate" element={<PostCreate />} />
        <Route path="/postEdit/:id" element={<PostEdit />} />
        <Route path="/answerEdit/:postId/:answerId" element={<QAAnswerEdit />} />
        <Route path="/answerCreate/:postId" element={<QAAnswerCreate />} />

        <Route path="/coffeeChat" element={<CoffeeChat />} />
        <Route path="/chatRoom/:id" element={<ChatRoom />} />
        <Route path="/roomCreate" element={<RoomCreate />} />

        <Route path="/myProfile/:filter" element={<MyProfile />} />
        <Route path="/otherProfile/:id/:filter" element={<OtherProfile />} />
        <Route path="/myProfileEdit" element={<MyProfileEdit />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/userInfo" element={<UserInfo />} />

        <Route path="/notification" element={<Notification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
