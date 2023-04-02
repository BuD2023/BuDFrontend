import { dummyData } from '../store/dummy';
import FooterMenu from '../components/common/FooterMenu';
import NewsFilter from '../components/news/NewsFilter';
import NewsPosts from '../components/news/NewsPosts';
import Header from '../components/common/Header';
import { FcNews } from 'react-icons/fc';

export default function News() {
  return (
    <section>
      <div className="mt-9 flex min-h-[calc(100vh-160px)] flex-col gap-4 p-4 text-lightText dark:text-white">
        <Header type="category" title="IT 소식" icon={<FcNews />} />
        <div>
          <input type="text" placeholder="키워드로 검색" className="searchInput h-[60px] w-full rounded-xl bg-white p-4 text-xl font-bold text-[#514848] dark:bg-[#E4E4E4]" />
        </div>
        <div className="flex justify-between gap-4 text-[18px] font-bold">
          <div className="flex h-[56px] w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-greyBeige px-4 dark:bg-midNavy">
            <p className="text-center leading-[26px]">&#127357;&nbsp; Naver IT news</p>
            <p className="text-center text-[14px] font-semibold leading-[26px] text-white opacity-50">1시간마다 갱신됩니다</p>
          </div>
        </div>
        <NewsFilter />
        <NewsPosts newsData={dummyData} />
      </div>
      <FooterMenu />
    </section>
  );
}
