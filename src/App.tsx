import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Community from './pages/Community';
import News from './pages/News';
import SignUp from './pages/SignUp';
import { Job, Picture } from './components/SignUP/SignuUpList';
import CoffeeChat from './pages/CoffeeChat';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
<<<<<<< HEAD
import CommunityQADetail from './pages/CommunityQADetail';
import OtherProfile from './pages/OtherProfile';
=======
import ChatRoom from './pages/ChatRoom';
>>>>>>> 395eb9760e0471b4cb1da91d1bd32a34f6ec59ff

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
<<<<<<< HEAD
        <Route path="/otherProfile/:id" element={<OtherProfile />} />
=======
        <Route path="/chatRoom" element={<ChatRoom />} />
>>>>>>> 395eb9760e0471b4cb1da91d1bd32a34f6ec59ff
      </Routes>
    </BrowserRouter>
  );
}

export default App;
