import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Community from './pages/Community';
import Index from './pages/Index';
import News from './pages/News';
import SignUp from './pages/SignUp';
import { Job, Picture } from './components/SignUP/SignuUpList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp/picture" element={<Picture />} />
        <Route path="/signUp/job" element={<Job />} />
        <Route path="/news" element={<News />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
