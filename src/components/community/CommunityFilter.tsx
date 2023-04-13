import { PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';

interface ICommunityFilterPropsType {
  communityFilter: null | PostTypeType;
  setCommunityFilter: (x: PostTypeType | null) => void;
}

export default function CommunityFilter({ setCommunityFilter, communityFilter }: ICommunityFilterPropsType) {
  return (
    <div className="flex h-[56px] w-full gap-2 text-[18px] font-bold">
      <div
        onClick={() => setCommunityFilter(null)}
        className={`flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg ${communityFilter === null ? 'bg-[#383030] text-white' : 'bg-midIvory dark:bg-midNavy'} py-2 px-4`}
      >
        <p className="text-center leading-[26px]">전체</p>
      </div>
      <div
        onClick={() => setCommunityFilter('QNA')}
        className={`flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg ${communityFilter === 'QNA' ? 'bg-[#383030] text-white' : 'bg-midIvory dark:bg-midNavy'} py-2 px-4`}
      >
        <span className="whitespace-nowrap text-center leading-[26px]">Q &#38; A 피드</span>
      </div>
      <div
        onClick={() => setCommunityFilter('FEED')}
        className={`flex w-full cursor-pointer flex-wrap items-center justify-center rounded-lg ${communityFilter === 'FEED' ? 'bg-[#383030] text-white' : 'bg-midIvory dark:bg-midNavy'} py-2 px-4`}
      >
        <p className="whitespace-nowrap text-center leading-[26px]">개발 피드</p>
      </div>
    </div>
  );
}
