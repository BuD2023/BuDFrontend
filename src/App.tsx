import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Community from './pages/Community';
import News from './pages/News';
import SignUp from './pages/SignUp';
import { Job, Picture } from './components/SignUP/SignuUpList';
import CoffeeChat from './pages/CoffeeChat';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import CommunityQADetail from './pages/CommunityQADetail';
import OtherProfile from './pages/OtherProfile';
import ChatRoom from './pages/ChatRoom';
import ProfileEdit from './pages/MyProfileEdit';
import Setting from './pages/Setting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp/picture" element={<Picture />} />
        <Route path="/signUp/job" element={<Job />} />
        <Route path="/news" element={<News />} />
        <Route path="/community" element={<Community />} />
        <Route path="/communityQADetail/:id" element={<CommunityQADetail />} />
        <Route path="/coffeeChat" element={<CoffeeChat />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/otherProfile/:id" element={<OtherProfile />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
        <Route path="/myProfileEdit" element={<ProfileEdit />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
