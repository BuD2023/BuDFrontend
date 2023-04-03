import { useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import { dummyData } from '../store/dummy';
import { useNavigate } from 'react-router-dom';
import AddBtn from '../components/common/AddBtn';
import CommunityFilter from '../components/community/CommunityFilter';
import CommunitySort from '../components/community/CommunitySort';
import SearchBar from '../components/common/SearchBar';
import Header from '../components/common/Header';
import { FcGlobe } from 'react-icons/fc';

export default function Community() {
  let resultData = [...dummyData];

  // 커뮤니티 글 검색
  const [inputValue, setInputValue] = useState('');

  if (inputValue) {
    resultData = [...resultData.filter((i) => i.title.trim().split(' ').join('').toLowerCase().includes(inputValue.trim().split(' ').join('').toLowerCase()))];
  }

  // 커뮤니티 필터
  const [communityFilter, setCommunityFilter] = useState('all');
  if (communityFilter !== 'all') {
    if (communityFilter === 'feed') {
      resultData = dummyData.filter((i) => i.type === 'feed');
    }
    if (communityFilter === 'qna') {
      resultData = dummyData.filter((i) => i.type === 'qna');
    }
  }

  // 정렬
  const [sort, setSort] = useState('recent');
  if (sort === 'popular') resultData = resultData.sort((a, b) => b.likeCount - a.likeCount);
  if (sort === 'recent') resultData = resultData.sort((a, b) => Number(b.createdAt.split(' ').join('').split(':').join('')) - Number(a.createdAt.split(' ').join('').split(':').join('')));

  return (
    <section>
      <div className="relative mt-9 mb-16 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4 text-lightText dark:text-white">
        <AddBtn url="/postCreate" text="글쓰기" />
        <Header type="category" title="커뮤니티" icon={<FcGlobe />} />
        <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
        <CommunityFilter communityFilter={communityFilter} setCommunityFilter={setCommunityFilter} />
        <CommunitySort setSort={setSort} />
        <PostFormat resultData={resultData} />
      </div>
      <FooterMenu />
    </section>
  );
}
