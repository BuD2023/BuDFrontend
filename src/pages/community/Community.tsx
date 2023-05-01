import { useState } from 'react';
import { FcGlobe } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import AddBtn from '../../components/common/AddBtn';
import FooterMenu from '../../components/common/FooterMenu';
import Header from '../../components/common/Header';
import PostFormat from '../../components/common/PostFormat';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';
import SearchBar from '../../components/common/SearchBar';
import CommunityFilter from '../../components/community/CommunityFilter';
import CommunitySort from '../../components/community/CommunitySort';
import { postType, SortAndOrderType } from '../../components/community/_Community.interface';
import { useCommunityPostQuery } from '../../store/module/useCommunityQuery';

export default function Community() {
  // 커뮤니티 글 검색
  const [inputValue, setInputValue] = useState<string>('');

  // 정렬
  const [sortAndOrder, setSortAndOrder] = useState<SortAndOrderType>({
    sort: 'DATE',
    order: 'DESC',
  });

  const { filter } = useParams();
  const { sort, order } = sortAndOrder;
  const POSTLIST_SIZE = 10;

  const { isLoading, refetch } = useCommunityPostQuery(inputValue, sort, order, POSTLIST_SIZE, filter === 'all' ? 'ALL' : (filter as postType));

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative mb-16 mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4 text-lightText dark:text-white">
        <Header type="category" title="커뮤니티" icon={<FcGlobe />} restart={refetch} isLoading={isLoading} />
        <AddBtn url="/postCreate" text="글쓰기" />
        <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
        <CommunityFilter />
        <CommunitySort />
        <PostFormat inputValue={inputValue} />
      </div>
      <FooterMenu />
    </section>
  );
}
