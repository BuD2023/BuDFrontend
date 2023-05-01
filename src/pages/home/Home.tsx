import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import postNotificationTokenAxios from '../../apiFetcher/notificationInfo/postNotificationToken';
import FooterMenu from '../../components/common/FooterMenu';
import HomeCommitCalendar from '../../components/home/HomeCommitCalendar';
import HomeCommitSection from '../../components/home/HomeCommitSection';
import HomeLevelSection from '../../components/home/HomeLevelSection';
import HomeTitle from '../../components/home/HomeTitle';
import { useGithubQuery } from '../../store/module/useGithubQuery';
import { useMyProfileQuery } from '../../store/module/useMyProfileQuery';
import { loginUserInfo } from '../../store/recoil/user';
import { getFcmToken } from '../../utils/fcm';

export default function Home() {
  const { data, isLoading } = useGithubQuery();

  const { data: userProfileData, isLoading: profileIsLoading } = useMyProfileQuery();

  // 토큰 get
  const [userInfo, setUserInfo] = useRecoilState(loginUserInfo);
  console.log(userInfo);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    (async () => {
      const fcmToken = await getFcmToken();
      if (userInfo) {
        await postNotificationTokenAxios(userInfo?.token as string, {
          fcmToken: fcmToken as string,
        });
      }
    })();
  });

  useEffect(() => {
    if (token) {
      setUserInfo((prev: any) => ({
        ...prev,
        ...userProfileData,
      }));
    }
  }, [profileIsLoading]);

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
