import { useNavigate, useParams } from 'react-router-dom';

export default function CommunityFilter() {
  const navigate = useNavigate();
  const { filter } = useParams();

  return (
    <div className="flex h-[56px] w-full gap-2 text-[18px] font-bold">
      <div
        onClick={() => {
          navigate('/community/all');
        }}
        className={`flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg ${filter === 'all' ? 'bg-[#383030] text-white' : 'bg-midIvory dark:bg-midNavy'} py-2 px-4`}
      >
        <p className="text-center leading-[26px]">전체</p>
      </div>
      <div
        onClick={() => {
          navigate('/community/QNA');
        }}
        className={`flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg ${filter === 'QNA' ? 'bg-[#383030] text-white' : 'bg-midIvory dark:bg-midNavy'} py-2 px-4`}
      >
        <span className="whitespace-nowrap text-center leading-[26px]">Q &#38; A 피드</span>
      </div>
      <div
        onClick={() => {
          navigate('/community/FEED');
        }}
        className={`flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg ${filter === 'FEED' ? 'bg-[#383030] text-white' : 'bg-midIvory dark:bg-midNavy'} py-2 px-4`}
      >
        <p className="whitespace-nowrap text-center leading-[26px]">개발 피드</p>
      </div>
    </div>
  );
}
