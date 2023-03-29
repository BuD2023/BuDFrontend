import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';

export default function Home() {
  return (
    <>
      <div className="relative mt-16 flex h-full min-h-screen w-full flex-col gap-6 bg-darkNavy p-4">
        <HomeTitle />
        <HomeLevelSection />
        <HomeCommitSection />
        <HomeCommitCalendar />
      </div>
      <FooterMenu />
    </>
  );
}