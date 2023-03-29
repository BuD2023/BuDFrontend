import { BsBellFill } from 'react-icons/bs';
import { FcGlobe } from 'react-icons/fc';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';

export default function Community() {
  const orders = ['최신순', '인기순', '팔로우 게시글만 보기'];

  return (
    <section>
      <div className="mt-16 flex flex-col gap-4 p-4 text-white">
        <div className="mb-4 flex h-[26px] items-center justify-between">
          <h1 className="flex items-center gap-2 text-[26px] font-bold">
            <FcGlobe />
            커뮤니티
          </h1>
          <BsBellFill size="20" className="cursor-pointer" />
        </div>
        <div>
          <input type="text" placeholder="키워드로 검색" className="searchInput h-[60px] w-full rounded-md bg-[#E4E4E4] p-4 text-xl font-bold text-[#514848]" />
        </div>
        <div className="flex h-[56px] gap-2 text-[18px] font-bold">
          <div className="flex w-full cursor-pointer items-center justify-center bg-midNavy px-4">
            <p className="text-center leading-[26px]">전체</p>
          </div>
          <div className="flex w-full cursor-pointer flex-wrap items-center justify-center bg-midNavy py-2 px-4">
            <span className="whitespace-nowrap text-center leading-[26px]">Q &#38; A</span>
          </div>
          <div className="flex w-full cursor-pointer flex-wrap items-center justify-center bg-[#383030] py-2 px-4">
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
        <PostFormat />
      </div>
      <FooterMenu />
    </section>
  );
}
