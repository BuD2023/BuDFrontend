import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CLIENT_ID = 'bec71f378661578c68bd';
const CLIENT_SECRET = 'a96b2fec345416f95516a64712b7eba1b1e8cf1b';

export default function Home() {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);

  async function getUserData() {
    try {
      const response = await axios('http://34.64.224.24:8080/home/github/info', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          withCredentials: true,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParams = urlParams.get('code');
    console.log(codeParams);

    if (codeParams && localStorage.getItem('accessToken') === null) {
      async function getAccessToken() {
        const response = await axios('http://서버주소/getAccessToken?code=' + codeParams, {
          method: 'GET',
        });
        console.log(response.data);
        if (response.data.access_token) {
          localStorage.setItem('accessToken', response.data.access_token);
          setRerender(!rerender);
        }
      }
      getAccessToken();
    }
    getUserData();
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
      </div>
      <FooterMenu />
    </section>
  );
}
