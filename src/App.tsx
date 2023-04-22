import { Route, Routes } from 'react-router-dom';
import './firebase-messaging-sw.js';
import CoffeeChat from './pages/coffeeChat/CoffeeChat';
import MyProfile from './pages/profile/MyProfile';
import ChatRoom from './pages/coffeeChat/ChatRoom';
import NotFound from './pages/NotFound';
import NewsDetail from './pages/news/NewsDetail';
import Notification from './pages/notification/Notification';
import { useEffect, useLayoutEffect } from 'react';
import LogInPage from './pages/SignUp/LogInPage';
import SetPicture from './components/SignUp/SetPicture';
import SetJob from './components/SignUp/SetJob';
import Test3 from './pages/Test3';
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
import { RecoilRoot } from 'recoil';
import { useNotificationTokenMutation } from './store/module/useNotificationQuery.js';
import { getFcmToken } from './utils/firebase.js';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const foregroundMessaging = getMessaging(app);

async function requestPermission() {
  // 토큰 받기
  const token = await getFcmToken();

  // 토큰 있으면 콘솔 출력
  if (token) console.log('token: ', token);
  else console.log('Can not get Token');

  // foreground 알림 푸쉬 받기
  onMessage(foregroundMessaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
  });
}

requestPermission();

function App() {
  const $html = document.querySelector('html');

  //테마 변경
  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      $html?.classList.add('dark');
    }
  }, []);

  const { mutate: postFcmTokenMutation } = useNotificationTokenMutation();

  useEffect(() => {
    const getToken = async () => {
      const response = await getFcmToken();
      postFcmTokenMutation({
        // 나중에수정
        fcmToken: response as string,
      });
    };
    getToken();
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

        <Route path="/test3" element={<Test3 />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
