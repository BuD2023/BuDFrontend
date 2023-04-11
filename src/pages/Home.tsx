import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import axios from 'axios';
import { useEffect } from 'react';

export const accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYW1lc2tpbTk3Iiwicm9sZSI6IltST0xFX1ZFUklGSUVEXSIsImlhdCI6MTY4MTE5MTIyMSwiZXhwIjoxNjgxMTk0ODIxfQ.kWyVN-rb693vM0x030N2TtT8AnzSuLi89hRPj0FSKaJl1vGhoAMiCCd3gfhcd5vVNOmhCEEHyL_d4SP5Ks8REA';

export default function Home() {
  const getUserData = async () => {
    try {
      const response = await axios.get('api/home/github/info');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <HomeTitle />
        <HomeLevelSection />
        <HomeCommitSection />
        <HomeCommitCalendar />
      </div>
      <FooterMenu />
    </section>
  );
}
