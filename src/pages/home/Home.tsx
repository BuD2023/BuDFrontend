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

  // useEffect(() => {
  //   fetch('http://34.64.224.24:8080/login/oauth2/code/github?code=bd9ae6533ee8948bb138&state=JvPOdFNmjGjmK9EvjNT7Z314rDIrfjBoOute13mYeok%3D')
  //     .then((response) => {
  //       console.log(response.headers.get('X-Refresh-Token'));
  //       return response.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
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
