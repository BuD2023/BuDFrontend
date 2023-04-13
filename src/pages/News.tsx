import FooterMenu from '../components/common/FooterMenu';
import NewsFilter from '../components/news/NewsFilter';
import NewsPosts from '../components/news/NewsPosts';
import Header from '../components/common/Header';
import { FcNews } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import NewsKeywordFilter from '../components/news/NewsKeywordFilter';
import { useNewsQuery } from '../store/module/useNewsQuery';
import { useInView } from 'react-intersection-observer';

export default function News() {
  // 키워드 필터
  const [filter, setFilter] = useState(false);
  const [filterKeywords, setFilterKeywords] = useState('');
  const [inputKeyword, setInputKeyword] = useState('');
  const [sort, setSort] = useState(false);

  const { data, isLoading, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useNewsQuery(inputKeyword, sort, filterKeywords);

  const handleInputEnter = (e: any) => {
    setInputKeyword(e.currentTarget.value);
    setFilterKeywords('');
  };

  if (error) {
    console.log(error);
  }

  // 인피니티 스크롤
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <NewsKeywordFilter filter={filter} setFilter={setFilter} filterKeywords={filterKeywords} setFilterKeywords={setFilterKeywords} />
      <section>
        <div className="mt-9 flex min-h-[calc(100vh-160px)] flex-col gap-4 p-4 text-lightText dark:text-white">
          <Header type="category" title="IT 소식" icon={<FcNews />} />
          <div>
            <input
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleInputEnter(e);
              }}
              type="text"
              placeholder={filterKeywords.length > 0 ? filterKeywords : '키워드로 검색'}
              className="searchInput h-[60px] w-full rounded-xl bg-white p-4 text-xl font-bold text-[#514848] dark:bg-[#E4E4E4]"
            />
          </div>
          <div className="flex justify-between gap-4 text-[18px] font-bold">
            <div className="flex h-[56px] w-full flex-col items-center justify-center rounded-xl bg-greyBeige px-4 dark:bg-midNavy">
              <p className="text-center leading-[26px]">&#127357;&nbsp; Naver IT news</p>
              <p className="text-center text-[14px] font-semibold leading-[26px] text-white opacity-50">12시간마다 갱신됩니다</p>
            </div>
          </div>
          <NewsFilter setFilter={setFilter} sort={sort} setSort={setSort} />
          {data !== undefined && <NewsPosts newsData={data.pages.flatMap((page) => page)} />}
        </div>
        <div ref={ref} />
        <FooterMenu />
      </section>
    </>
  );
}
