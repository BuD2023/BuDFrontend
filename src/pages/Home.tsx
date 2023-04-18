import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import { useNavigate } from 'react-router-dom';
import { useGithubQuery } from '../store/module/useGithubQuery';
import { useEffect } from 'react';
import sendFCMTokenFunc, { requestPermission } from '../utils/fcm';
import NotFound from './NotFound';

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGithubQuery();

  useEffect(() => {
    requestPermission();
    sendFCMTokenFunc();
  }, []);

  if (error) {
    return <NotFound />;
  }

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <HomeTitle isLoading={isLoading} nickName={data?.nickName} />
        <HomeLevelSection isLoading={isLoading} levelCode={data?.levelCode} remainCommitCountNextLevel={data?.remainCommitCountNextLevel} />
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
