import { Route, Routes } from 'react-router-dom';
import './firebase-messaging-sw.js';
import Community from './pages/Community';
import News from './pages/News';
import CoffeeChat from './pages/CoffeeChat';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import CommunityQADetail from './pages/CommunityQADetail';
import OtherProfile from './pages/OtherProfile';
import ChatRoom from './pages/ChatRoom';
import CommunityFeedDetail from './pages/CommunityFeedDetail';
import NotFound from './pages/NotFound';
import NewsDetail from './pages/NewsDetail';
import ProfileEdit from './pages/MyProfileEdit';
import Setting from './pages/Setting';
import UserInfo from './pages/UserInfo';
import Notification from './pages/Notification';
import { useLayoutEffect } from 'react';
import RoomCreate from './pages/RoomCreate';
import PostCreate from './pages/PostCreate';
import LogInPage from './pages/LogInPage';
import SignUp from './pages/SignUp';
import SetPicture from './components/SignUp/SetPicture';
import SetJob from './components/SignUp/SetJob';
import Test3 from './pages/Test3';
import PostEdit from './pages/PostEdit';
import QAAnswerEdit from './pages/QAAnswerEdit';
import QAAnswerCreate from './pages/QAAnswerCreate';

function App() {
  const $html = document.querySelector('html');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }

  //테마 변경
  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      $html?.classList.add('dark');
    }
  }, []);

  return (
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
      <Route path="/myProfileEdit" element={<ProfileEdit />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/userInfo" element={<UserInfo />} />

      <Route path="/notification" element={<Notification />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/test3" element={<Test3 />} />
    </Routes>
  );
}

export default App;
