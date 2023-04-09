import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { CLIENT_ID, CLIENT_SECRET } from './LogInPage';

export const CLIENT_ID = 'bec71f378661578c68bd';
export const CLIENT_SECRET = 'a96b2fec345416f95516a64712b7eba1b1e8cf1b';

export default function Home() {
  // useEffect(() => {
  //   const fetchGithubInfo = async () => {
  //     try {
  //       const response = await axios.get('http://34.64.224.24:8080/home/github/info');
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchGithubInfo();
  // }, []);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');
  //   console.log(code);
  //   const getAccessToken = async () => {
  //     try {
  //       const response = await axios.post('https://github.com/login/oauth/access_token', null, {
  //         params: {
  //           client_id: CLIENT_ID,
  //           client_secret: CLIENT_SECRET,
  //           code: code,
  //         },
  //         headers: {
  //           Accept: 'application/json',
  //         },
  //       });
  //       const { access_token } = response.data;
  //       localStorage.setItem('token', access_token);
  //       console.log(access_token);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   if (code) {
  //     getAccessToken();
  //   }
  // }, []);

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <HomeTitle />
        <HomeLevelSection />
        <HomeCommitSection />
        <HomeCommitCalendar />
        <button onClick={() => navigate('/test')} className="mb-4 flex w-full items-center justify-center rounded-[20px] bg-greyBeige p-4 text-[22px] font-semibold dark:bg-sky">
          test
        </button>
      </div>
      <FooterMenu />
    </section>
  );
}
