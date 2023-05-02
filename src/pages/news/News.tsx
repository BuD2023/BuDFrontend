import { FcNews } from 'react-icons/fc';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useNewsQuery } from '../../store/module/useNewsQuery';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';
import NewsKeywordFilter from '../../components/news/NewsKeywordFilter';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import NewsFilter from '../../components/news/NewsFilter';
import NewsPosts from '../../components/news/NewsPosts';
import FooterMenu from '../../components/common/FooterMenu';

export default function News() {
  // 키워드 필터
  const [filter, setFilter] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sort, setSort] = useState(true);
  const [order, setOrder] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data, isLoading, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useNewsQuery(inputValue, sort, order, inputValue);

  if (error) {
    navigate('/NotFound');
  }

  // 인피니티 스크롤
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  return (
    <>
      <ScrollToTopBtn />
      <NewsKeywordFilter filter={filter} setFilter={setFilter} inputValue={inputValue} setInputValue={setInputValue} />
      <section>
        <div className="mt-9 flex min-h-[calc(100vh-160px)] flex-col gap-4 p-4 text-lightText dark:text-white">
          <Header type="category" title="IT 소식" icon={<FcNews />} restart={refetch} isLoading={isLoading} />
          <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
          <div className="flex justify-between gap-4 text-[18px] font-bold">
            <div className="flex h-[56px] w-full flex-col items-center justify-center rounded-xl bg-greyBeige px-4 dark:bg-midNavy">
              <p className="text-center leading-[26px]">&#127357;&nbsp; Naver IT news</p>
              <p className="text-center text-[14px] font-semibold leading-[26px] text-white opacity-50">12시간마다 갱신됩니다</p>
            </div>
          </div>
          <NewsFilter setFilter={setFilter} sort={sort} setSort={setSort} order={order} setOrder={setOrder} />
          <NewsPosts isLoading={isLoading} newsData={data?.pages.flatMap((page) => page.content)} />
        </div>
        <div ref={ref} />
        <FooterMenu />
      </section>
    </>
  );
}
