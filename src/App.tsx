import { Route, Routes } from 'react-router-dom';
import './firebase-messaging-sw.js';
import CoffeeChat from './pages/coffeeChat/CoffeeChat';
import MyProfile from './pages/profile/MyProfile';
import ChatRoom from './pages/coffeeChat/ChatRoom';
import NotFound from './pages/NotFound';
import NewsDetail from './pages/news/NewsDetail';
import Notification from './pages/notification/Notification';
import { useLayoutEffect } from 'react';
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
import { RecoilRoot } from 'recoil';
import { onMessage } from 'firebase/messaging';
import { firebaseMessaging } from './utils/fcm.js';

function App() {
  const $html = document.querySelector('html');

  //테마 변경
  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      $html?.classList.add('dark');
    }
  }, []);

  // FCM 메시지 수신 이벤트 핸들링
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
  // onBackgroundMessage(firebaseMessaging, (payload) => {
  //   const title = payload.notification?.title;
  //   const options = {
  //     body: payload.notification?.body,
  //   };

  //   console.log('Background message received. title : ', title, 'options : ', options);
  //   navigator.serviceWorker.ready.then((registration) => {
  //     registration.showNotification(title as string, options);
  //   });
  // });

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
