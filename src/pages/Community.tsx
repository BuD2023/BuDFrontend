import { useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import AddBtn from '../components/common/AddBtn';
import CommunityFilter from '../components/community/CommunityFilter';
import CommunitySort from '../components/community/CommunitySort';
import SearchBar from '../components/common/SearchBar';
import Header from '../components/common/Header';
import { FcGlobe } from 'react-icons/fc';
import { PostTypeType } from '../apiFetcher/communityInfo/getCommunityPost';
import { OrderType, SortType } from '../store/module/useCommunityQuery';
import ScrollToTopBtn from '../components/common/ScrollToTopBtn';

export interface SortAndOrderType {
  sort: SortType;
  order: OrderType;
}

export default function Community() {
  // 커뮤니티 글 검색
  const [inputValue, setInputValue] = useState('');

  // 정렬
  const [sortAndOrder, setSortAndOrder] = useState<SortAndOrderType>({
    sort: 'DATE',
    order: 'DESC',
  });

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative mb-16 mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4 text-lightText dark:text-white">
        <Header type="category" title="커뮤니티" icon={<FcGlobe />} />
        <AddBtn url="/postCreate" text="글쓰기" />
        <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
        <CommunityFilter />
        <CommunitySort setSortAndOrder={setSortAndOrder} sortAndOrder={sortAndOrder} />
        <PostFormat inputValue={inputValue} sortAndOrder={sortAndOrder} />
      </div>
      <FooterMenu />
    </section>
  );
}
