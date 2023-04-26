import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FooterMenu from '../../components/common/FooterMenu';
import HomeCommitCalendar from '../../components/home/HomeCommitCalendar';
import HomeCommitSection from '../../components/home/HomeCommitSection';
import HomeLevelSection from '../../components/home/HomeLevelSection';
import HomeTitle from '../../components/home/HomeTitle';
import { useGithubQuery } from '../../store/module/useGithubQuery';

export default function Home() {
  const { data, isLoading, error } = useGithubQuery();
  const navigate = useNavigate();

  if (error) {
    navigate('/NotFound');
  }
  useEffect(() => {
    fetch(window.location.href, { method: 'GET' })
      .then((response) => {
        console.log(response.headers);
        const refreshToken = response.headers.get('Authorization');
        if (refreshToken) {
          console.log(refreshToken);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .post('/login', data)
  //     .then((response) => {
  //       const { accessToken } = response.data;
  //       console.log(accessToken);

  //       // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  //       // accessToken을 localStorage, cookie 등에 저장하지 않는다!
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // ... 에러 처리
  //     });
  // }, []);

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <HomeTitle isLoading={isLoading} nickName={data?.nickName as string} />
        <HomeLevelSection levelImg={data?.imagePath} isLoading={isLoading} levelCode={data?.levelCode} remainCommitCountNextLevel={data?.remainCommitCountNextLevel} />
        <HomeCommitSection isLoading={isLoading} todayCommitCount={data?.todayCommitCount} consecutiveCommitDays={data?.consecutiveCommitDays} thisWeekCommitCount={data?.thisWeekCommitCount} />
        <HomeCommitCalendar isLoading={isLoading} commits={data?.commits} />
        {/* <button onClick={() => navigate('/test3')} className="mb-4 flex w-full items-center justify-center rounded-[20px] bg-greyBeige p-4 text-[22px] font-semibold">
          test3
        </button> */}
      </div>
      <FooterMenu />
    </section>
  );
}
