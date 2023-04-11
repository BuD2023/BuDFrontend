import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    withCredentials: true,
  };

  const getUserData = async () => {
    try {
      const response = await axios.get('http://34.64.224.24:8080/home/github/info', { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);

    if (code && localStorage.getItem('accessToken') === null) {
      const getAccessToken = async () => {
        try {
          const response = await axios.get(`http://서버주소/getAccessToken?code= ${code}`);
          console.log(response.data);
          if (response.data.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);
            setRerender(!rerender);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getAccessToken();
    }
  }, []);

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
        <button onClick={() => navigate('/test2')} className="mb-4 flex w-full items-center justify-center rounded-[20px] bg-greyBeige p-4 text-[22px] font-semibold">
          test2
        </button>
        <button onClick={() => navigate('/test3')} className="mb-4 flex w-full items-center justify-center rounded-[20px] bg-greyBeige p-4 text-[22px] font-semibold">
          test3
        </button>
      </div>
      <FooterMenu />
    </section>
  );
}
