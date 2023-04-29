import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import FooterMenu from '../../components/common/FooterMenu';
import HomeCommitCalendar from '../../components/home/HomeCommitCalendar';
import HomeCommitSection from '../../components/home/HomeCommitSection';
import HomeLevelSection from '../../components/home/HomeLevelSection';
import HomeTitle from '../../components/home/HomeTitle';
import { BASE_URL } from '../../constant/union';
import { useGithubQuery } from '../../store/module/useGithubQuery';
import { useMyProfileQuery } from '../../store/module/useMyProfileQuery';
import { loginUserInfo } from '../../store/recoil/user';
import { getAccessToken } from '../../utils/getAccessToken';

export default function Home() {
  const { data, isLoading, error } = useGithubQuery();
  const navigate = useNavigate();

  // 토큰 get
  const [rerender, setRerender] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(loginUserInfo);
  console.log(userInfo);

  const { data: userProfileData } = useMyProfileQuery();
  const token = localStorage.getItem('accessToken');
  const logInStatus = localStorage.getItem('logInStatus');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    if (codeParams && localStorage.getItem('accessToken') === null) {
      getAccessToken(codeParams, setRerender, rerender);
    } else {
      const token = localStorage.getItem('accessToken');
      console.log(JSON.parse(token as string));
    }
  }, []);

  useEffect(() => {
    if (token) {
      setUserInfo((prev: any) => ({
        ...prev,
        ...data,
      }));
    } else {
      if (logInStatus === 'false') navigate('/logIn');
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
