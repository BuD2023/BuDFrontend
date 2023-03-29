import { BsBellFill } from 'react-icons/bs';
import { FcGlobe, FcPortraitMode, FcLike, FcSms } from 'react-icons/fc';
import { dummyData } from '../store/dummy';
import FooterMenu from '../components/common/FooterMenu';

export default function Community() {
  const orders = ['최신순', '인기순', '팔로우 게시글만 보기'];

  return (
    <section>
      <div className="mt-6 flex flex-col gap-4 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-[26px] font-bold">
            <FcGlobe />
            커뮤니티
          </h1>
          <BsBellFill size="20" />
        </div>
        <div>
          <input type="text" placeholder="키워드로 검색" className="searchInput h-[60px] w-full rounded-md bg-[#E4E4E4] p-4 text-xl font-bold text-[#514848]" />
        </div>
        <div className="flex h-[56px] gap-2 text-[18px] font-bold">
          <div className="] flex w-full items-center justify-center bg-midNavy px-4">
            <p className="text-center leading-[26px]">전체</p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-center bg-midNavy py-2 px-4">
            <span className="whitespace-nowrap text-center leading-[26px]">Q &#38; A</span>
          </div>
          <div className="flex w-full flex-wrap items-center justify-center bg-[#383030] py-2 px-4">
            <p className="whitespace-nowrap text-center leading-[26px]">개발 피드</p>
          </div>
        </div>
        <ul className="flex h-[40px] items-center gap-4 rounded-[20px] bg-lightNavy px-4 text-xs font-bold">
          {orders.map((order, idx) => (
            <li key={order} className={`cursor-pointer ${orders.length - 1 === idx ? 'grow text-end' : ''}`}>
              · {order}
            </li>
          ))}
        </ul>
        <ul>
          {dummyData.map((data) => (
            <li key={data.id} className="mb-6 flex flex-col items-center gap-4 rounded-[20px] bg-midNavy ">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex w-full">
                  <div className="flex gap-1">
                    <img src={data.img} alt={data.title} className="w-[58px] rounded-full" />
                    <div className="pl-3">
                      <p className="text-xl font-bold">{data.userName}</p>
                      <p className="text-[17px] opacity-50">{data.time}</p>
                    </div>
                  </div>
                  <div className="grow text-end font-bold">
                    <div className="flex h-full items-center justify-end gap-3">
                      <FcPortraitMode />
                      <p>팔로우</p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <h1 className="mb-6 text-lg font-bold">{data.title}</h1>
                  <p className="text-base">{data.detail}</p>
                </div>
              </div>
              <div className="flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#2c2e34] px-6 text-base">
                <div className="flex items-center gap-2">
                  <FcLike />
                  {data.likeCount}
                </div>
                <div className="flex items-center gap-2">
                  <FcSms />
                  {data.commentCount}
                </div>
                <div className="flex grow items-center justify-end gap-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1"
                    viewBox="0 0 48 48"
                    enableBackground="new 0 0 48 48"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#f9e288" d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path>
                  </svg>
                  스크랩
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <FooterMenu />
    </section>
  );
}
