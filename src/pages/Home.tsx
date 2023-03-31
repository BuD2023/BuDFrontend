import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';

export default function Home() {
  return (
    <>
      <div className="relative flex h-full min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-darkNavy p-4 pt-20">
        <HomeTitle />
        <HomeLevelSection />
        <HomeCommitSection />
        <HomeCommitCalendar />
      </div>
      <FooterMenu />
    </>
  );
}
