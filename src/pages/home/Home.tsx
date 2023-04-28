import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FooterMenu from '../../components/common/FooterMenu';
import HomeCommitCalendar from '../../components/home/HomeCommitCalendar';
import HomeCommitSection from '../../components/home/HomeCommitSection';
import HomeLevelSection from '../../components/home/HomeLevelSection';
import HomeTitle from '../../components/home/HomeTitle';
import { BASE_URL } from '../../constant/union';
import { useGithubQuery } from '../../store/module/useGithubQuery';

export default function Home() {
  const { data, isLoading, error } = useGithubQuery();
  const navigate = useNavigate();

  // 토큰 get
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    if (codeParams && localStorage.getItem('accessToken') === null) {
      const getAccessToken = async () => {
        try {
          const response = await axios.get(BASE_URL + 'token', {
            params: {
              code: codeParams,
            },
          });
          const data = response.headers;
          console.log(data);
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            setRerender(!rerender);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getAccessToken();
    }
  }, []);

  if (error) {
    navigate('/NotFound');
  }

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <HomeTitle isLoading={isLoading} nickName={data?.nickName as string} />
        <HomeLevelSection levelImg={data?.imagePath} isLoading={isLoading} levelCode={data?.levelCode} remainCommitCountNextLevel={data?.remainCommitCountNextLevel} />
        <HomeCommitSection isLoading={isLoading} todayCommitCount={data?.todayCommitCount} consecutiveCommitDays={data?.consecutiveCommitDays} thisWeekCommitCount={data?.thisWeekCommitCount} />
        <HomeCommitCalendar isLoading={isLoading} commits={data?.commits} />
      </div>
      <FooterMenu />
    </section>
  );
}
