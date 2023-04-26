import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import customAxios from '../../apiFetcher/customAxios';
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

  if (error) {
    navigate('/NotFound');
  }
  // useEffect(() => {
  //   (async () => {
  //     const response = await axios({
  //       method: 'get',
  //       url: `${BASE_URL}login/oauth2`,
  //     });
  //     console.log(response);
  //   })();
  // }, []);

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
        <HomeTitle isLoading={isLoading} />
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
