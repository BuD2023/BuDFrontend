import { Route, Routes, useNavigate } from 'react-router-dom';
import './firebase-messaging-sw.js';
import { Suspense, useEffect, useLayoutEffect } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { loginUserInfo } from './store/recoil/user.js';
import React from 'react';

function App() {
  const $html = document.querySelector('html');
  const navigate = useNavigate();

  // 리코일
  const user = useRecoilValue(loginUserInfo);
  // const logInStatus = localStorage.getItem('logInStatus');

  const Home = React.lazy(() => import('./pages/home/Home'));
  const News = React.lazy(() => import('./pages/news/News'));
  const NewsDetail = React.lazy(() => import('./pages/news/NewsDetail'));
  const Community = React.lazy(() => import('./pages/community/Community'));
  const CommunityQADetail = React.lazy(() => import('./pages/community/CommunityQADetail'));
  const CommunityFeedDetail = React.lazy(() => import('./pages/community/CommunityFeedDetail'));
  const PostCreate = React.lazy(() => import('./pages/community/PostCreate'));
  const PostEdit = React.lazy(() => import('./pages/community/PostEdit'));
  const QAAnswerEdit = React.lazy(() => import('./pages/community//QAAnswerEdit'));
  const QAAnswerCreate = React.lazy(() => import('./pages/community//QAAnswerCreate'));
  const CoffeeChat = React.lazy(() => import('./pages/coffeeChat/CoffeeChat'));
  const ChatRoom = React.lazy(() => import('./pages/coffeeChat/ChatRoom'));
  const RoomCreate = React.lazy(() => import('./pages/coffeeChat/RoomCreate'));
  const MyProfile = React.lazy(() => import('./pages/profile/MyProfile'));
  const OtherProfile = React.lazy(() => import('./pages/profile/OtherProfile'));
  const MyProfileEdit = React.lazy(() => import('./pages/profile/MyProfileEdit'));
  const Setting = React.lazy(() => import('./pages/setting/Setting'));
  const UserInfo = React.lazy(() => import('./pages/setting/UserInfo'));
  const Notification = React.lazy(() => import('./pages/notification/Notification'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));
  const LogInPage = React.lazy(() => import('./pages/SignUp/LogInPage'));
  const LogInLoadingPage = React.lazy(() => import('./pages/SignUp/LoginLoadingPage'));
  const SignUp = React.lazy(() => import('./pages/SignUp/SignUp'));
  const SetPicture = React.lazy(() => import('./components/SignUp/SetPicture'));
  const SetJob = React.lazy(() => import('./components/SignUp/SetJob'));

  //테마 변경
  useLayoutEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      $html?.classList.add('dark');
    }
  }, []);

  // 토큰 설정
  useEffect(() => {
    if (!user) navigate('/logIn');
    // requestPermission();
    // (async () => {
    //   // 토큰 받기
    //   const token = await getFcmToken();
    //   if (user?.token) {
    //     console.log('토큰 있다!!!' + user.token);
    //     // 토큰 서버에 보내기
    //     await customAxios({
    //       method: 'post',
    //       url: `/notification-info`,
    //       headers: {
    //         Authorization: user?.token,
    //         'Content-Type': 'application/json',
    //       },
    //       // 나중에수정
    //       data: { fcmToken: token },
    //     });
    //   }
    // })();
  }, [user]);

  return (
    <RecoilRoot>
      <Suspense>
        {localStorage.getItem('accessToken') ? (
          <Routes>
            <Route path="/" element={<Home />} />

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
        ) : (
          <Routes>
            <Route path="/logIn" element={<LogInPage />} />
            <Route path="/logInLoading" element={<LogInLoadingPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signUp/picture" element={<SetPicture />} />
            <Route path="/signUp/job" element={<SetJob />} />
            <Route path="*" element={<LogInPage />} />
          </Routes>
        )}
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
