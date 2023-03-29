import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Community from './pages/Community';
import News from './pages/News';
import SignUp from './pages/SignUp';
import { Job, Picture } from './components/SignUP/SignuUpList';
import CoffeeChat from './pages/CoffeeChat';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';

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
        <Route path="/coffeeChat" element={<CoffeeChat />} />
        <Route path="/myProfile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;