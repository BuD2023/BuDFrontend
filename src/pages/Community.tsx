import { useState } from 'react';
import { BsBellFill } from 'react-icons/bs';
import { FcGlobe } from 'react-icons/fc';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import { dummyData } from '../store/dummy';
import { IoMdAdd } from 'react-icons/io';

export default function Community() {
  const orders = ['최신순', '인기순', '팔로우 게시글만 보기'];
  let resultData = [...dummyData];

  // 커뮤니티 글 검색
  const [inputValue, setInputValue] = useState('');
  const inputHandler = () => {
    if (inputValue) {
      resultData = [...resultData.filter((i) => i.title.trim().split(' ').join('').toLowerCase().includes(inputValue.trim().split(' ').join('').toLowerCase()))];
    }
    return resultData;
  };
  // console.log(resultData);

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
  const setMenuHandler = (state: string) => {
    setCommunityFilter(state);
  };

  return (
    <section>
      <div className="relative mt-16 flex min-h-[calc(100vh-160px)] flex-col gap-4 p-4 text-white">
        <div className="fixed bottom-[120px] right-[30px] flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-[2px] border-pointGreen bg-pointGreen text-[24px] transition-all hover:scale-[1.1] hover:border-[white] dark:border-[#7cb342] dark:bg-[#7cb342]">
          <IoMdAdd />
        </div>
        <div className="mb-4 flex h-[26px] items-center justify-between">
          <h1 className="flex items-center gap-2 text-[26px] font-bold">
            <FcGlobe />
            커뮤니티
          </h1>
          <BsBellFill size="20" className="cursor-pointer" />
        </div>
        <div>
          <input
            value={inputValue}
            onChange={(e) => {
              e.preventDefault();
              setInputValue(e.target.value);
            }}
            onKeyPress={(e) => {
              e.preventDefault();
              inputHandler();
            }}
            type="text"
            placeholder="키워드로 검색"
            className="searchInput h-[60px] w-full rounded-md bg-[#E4E4E4] p-4 text-xl font-bold text-[#514848]"
          />
        </div>
        <div className="flex h-[56px] gap-2 text-[18px] font-bold">
          <div
            onClick={() => setMenuHandler('all')}
            className={`flex w-full cursor-pointer flex-wrap items-center justify-center ${communityFilter === 'all' ? 'bg-[#383030]' : 'bg-midNavy'} py-2 px-4`}
          >
            <p className="text-center leading-[26px]">전체</p>
          </div>
          <div
            onClick={() => setMenuHandler('qna')}
            className={`flex w-full cursor-pointer flex-wrap items-center justify-center ${communityFilter === 'qna' ? 'bg-[#383030]' : 'bg-midNavy'} py-2 px-4`}
          >
            <span className="whitespace-nowrap text-center leading-[26px]">Q &#38; A</span>
          </div>
          <div
            onClick={() => setMenuHandler('feed')}
            className={`flex w-full cursor-pointer flex-wrap items-center justify-center ${communityFilter === 'feed' ? 'bg-[#383030]' : 'bg-midNavy'} py-2 px-4`}
          >
            <p className="whitespace-nowrap text-center leading-[26px]">개발 피드</p>
          </div>
        </div>
        <ul className="flex h-[40px] items-center gap-4 rounded-[20px] bg-lightNavy px-4 text-xs font-bold">
          {orders.map((order, idx) => (
            <li key={order} className={`cursor-pointer ${orders.length - 1 === idx ? 'text-white' : ''}`}>
              · {order}
            </li>
          ))}
        </ul>
        <PostFormat resultData={resultData} />
      </div>
      <FooterMenu />
    </section>
  );
}
