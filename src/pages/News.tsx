import { FcNews } from 'react-icons/fc';
import { BsBellFill } from 'react-icons/bs';
import { dummyData } from '../store/dummy';
import FooterMenu from '../components/common/FooterMenu';
import { useNavigate } from 'react-router-dom';

export default function News() {
  const orders = ['최신순', '인기순', '인기순2'];
  const navigate = useNavigate();

  return (
    <section>
      <div className="mt-16 flex flex-col gap-4 p-4 text-white">
        <div className="mb-4 flex h-[26px] items-center justify-between">
          <h1 className="flex items-center gap-2 text-[26px] font-bold">
            <FcNews />
            IT 소식
          </h1>
          <BsBellFill size="20" className="cursor-pointer" />
        </div>
        <div>
          <input type="text" placeholder="키워드로 검색" className="searchInput h-[60px] w-full rounded-md bg-[#E4E4E4] p-4 text-xl font-bold text-[#514848]" />
        </div>
        <div className="flex justify-between gap-4 text-[18px] font-bold">
          <div className="flex h-[56px] w-full cursor-pointer items-center justify-center bg-midNavy px-4">
            <p className="text-center leading-[26px]">&#127357;&nbsp; Naver news</p>
          </div>
          <div className="flex h-[56px] w-full cursor-pointer items-center justify-center bg-[#383030] px-4">
            <p className="text-center leading-[26px]">&#127354;&nbsp; Kakao news</p>
          </div>
        </div>
        <ul className="flex h-[40px] items-center gap-4 rounded-[20px] bg-lightNavy px-4 text-xs font-bold">
          {orders.map((order) => (
            <li key={order} className="cursor-pointer">
              · {order}
            </li>
          ))}
        </ul>
        <ul>
          {dummyData.map((data) => (
            <li onClick={() => navigate(`/newsDetail/${data.id}`)} key={data.id} className="mb-4 flex h-[115px] cursor-pointer items-center gap-1 rounded-[20px] bg-midNavy">
              <div className="shrink-0">
                <img src={data.img} alt={data.title} className="w-[115px] rounded-[20px]" />
              </div>
              <div className="w-full overflow-hidden pl-3 pr-5">
                <h1 className="mb-2 truncate text-base font-bold">{data.title}</h1>
                <p className="ellipsis mb-3 text-[13px] leading-4">{data.detail}</p>
                <div className="flex justify-between">
                  <p className="text-xs opacity-50">조회수 {data.view}</p>
                  <p className="text-xs opacity-50">{data.date}</p>
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
