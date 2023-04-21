import { useState } from 'react';

import { FcGlobe } from 'react-icons/fc';
import AddBtn from '../../components/common/AddBtn';
import FooterMenu from '../../components/common/FooterMenu';
import Header from '../../components/common/Header';
import PostFormat from '../../components/common/PostFormat';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';
import SearchBar from '../../components/common/SearchBar';
import CommunityFilter from '../../components/community/CommunityFilter';
import CommunitySort from '../../components/community/CommunitySort';
import { postType, SortAndOrderType } from '../../components/community/_Community.interface';

export default function Community() {
  // 커뮤니티 글 검색
  const [inputValue, setInputValue] = useState<string>('');

  // 정렬
  const [sortAndOrder, setSortAndOrder] = useState<SortAndOrderType>({
    sort: 'DATE',
    order: 'DESC',
  });

  // 커뮤니티
  const [filter, setFilter] = useState<postType | 'ALL'>('ALL');

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative mb-16 mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4 text-lightText dark:text-white">
        <Header type="category" title="커뮤니티" icon={<FcGlobe />} />
        <AddBtn url="/postCreate" text="글쓰기" />
        <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
        <CommunityFilter setFilter={setFilter} />
        <CommunitySort setSortAndOrder={setSortAndOrder} sortAndOrder={sortAndOrder} />
        <PostFormat inputValue={inputValue} sortAndOrder={sortAndOrder} filter={filter} />
      </div>
      <FooterMenu />
    </section>
  );
}
