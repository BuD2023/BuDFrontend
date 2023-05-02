import { useNavigate } from 'react-router-dom';
import { NewsPostsProps } from './_News.interface';
import newsDefaultImg from '../../assets/newsDefaultImg.webp';
import { timeForToday } from '../../utils/timeForToday';
import LazyLoadImage from '../../utils/LazyLoadImage';

export default function NewsPosts({ newsData, isLoading }: NewsPostsProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="mb-4 flex h-[115px] cursor-pointer items-center gap-1 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="shrink-0">
              <div className="h-[115px] w-[115px] rounded-[20px] bg-greyBeige dark:bg-sky"></div>
            </div>
            <div className="w-full overflow-hidden pl-3 pr-5"></div>
          </li>
        ))}
      </>
    );
  }

  return (
    <ul>
      {newsData?.length === 0 ? (
        <li className='className="mb-6 dark:bg-midNavy" flex h-[115px] flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory'>
          <div className="flex w-full items-center justify-center p-4 text-base font-semibold text-lightText dark:text-white">해당 검색 결과가 없습니다.</div>
        </li>
      ) : (
        newsData?.map((data, idx) => (
          <li onClick={() => navigate(`/newsDetail/${data.id}`)} key={idx} className="mb-4 flex h-[115px] cursor-pointer items-center gap-1 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="shrink-0">
              <LazyLoadImage src={(data.mainImgUrl ?? '').length > 0 ? data.mainImgUrl : newsDefaultImg} alt={data.title} className="h-[115px] w-[115px] rounded-[20px] object-cover" />
              {/* <img src={(data.mainImgUrl ?? '').length > 0 ? data.mainImgUrl : newsDefaultImg} alt={data.title} className="h-[115px] w-[115px] rounded-[20px] object-cover" /> */}
            </div>
            <div className="w-full overflow-hidden pl-3 pr-5">
              <p dangerouslySetInnerHTML={{ __html: data.title }} className="mb-2 truncate text-base font-bold"></p>
              <p dangerouslySetInnerHTML={{ __html: data.summaryContent }} className="ellipsis mb-3 text-[13px] leading-4"></p>
              <div className="flex justify-between">
                <p className="text-xs opacity-50">조회수 {data.hitCount}</p>
                <p className="text-xs opacity-50">{timeForToday(data.registeredAt)}</p>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
