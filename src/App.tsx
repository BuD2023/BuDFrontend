import { Route, Routes } from 'react-router-dom';
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

function App() {
  const $html = document.querySelector('html');

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

      <Route path="/community" element={<Community />} />
      <Route path="/communityQADetail/:id" element={<CommunityQADetail />} />
      <Route path="/communityFeedDetail/:id" element={<CommunityFeedDetail />} />
      <Route path="/postCreate" element={<PostCreate />} />

      <Route path="/coffeeChat" element={<CoffeeChat />} />
      <Route path="/chatRoom/:id" element={<ChatRoom />} />
      <Route path="/roomCreate" element={<RoomCreate />} />

      <Route path="/myProfile" element={<MyProfile />} />
      <Route path="/otherProfile/:id" element={<OtherProfile />} />
      <Route path="/myProfileEdit" element={<ProfileEdit />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/userInfo" element={<UserInfo />} />

      <Route path="/notification" element={<Notification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
