import { OrderType, SortType } from '../community/_Community.interface';

export type ProfilePostSortType = 'SCRAP_DATE' | 'POST_HIT' | 'POST_LIKE' | 'POST_DATE';

export interface ProfileSortPropsType {
  setSortAndOrder: (x: { sort: ProfilePostSortType | SortType; order: OrderType }) => void;
  sortAndOrder: {
    sort: ProfilePostSortType | SortType;
    order: OrderType;
  };
  postView: string;
}

export default function ProfileSort({ setSortAndOrder, sortAndOrder, postView }: ProfileSortPropsType) {
  const scrapSort = ['POST_DATE', 'SCRAP_DATE', 'POST_HIT', 'POST_LIKE'] as ProfilePostSortType[];
  const postSort = ['DATE', 'HIT', 'LIKE'] as SortType[];
  const order = ['DESC', 'ASC'] as OrderType[];

  const handleText = (text: ProfilePostSortType | OrderType | SortType) => {
    if (text === 'SCRAP_DATE') return '스크랩순';
    if (text === 'POST_DATE' || text === 'DATE') return '최신순';
    if (text === 'POST_HIT' || text === 'HIT') return '조회수순';
    if (text === 'POST_LIKE' || text === 'LIKE') return '좋아요순';
    if (text === 'ASC') return '오름차순';
    if (text === 'DESC') return '내림차순';
  };

  return (
    <ul className="flex h-[40px] w-full items-center justify-between rounded-[20px] bg-pointGreen px-4 text-xs text-white dark:bg-lightNavy">
      <div className="flex items-center gap-2">
        {(postView === 'scrap' ? scrapSort : postSort).map((sorting, idx) => (
          <li key={idx} onClick={() => setSortAndOrder({ ...sortAndOrder, sort: sorting })} className={`cursor-pointer ${sortAndOrder.sort === sorting ? '' : 'opacity-50'}`}>
            · <span>{handleText(sorting)}</span>
          </li>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {order.map((ordering, idx) => (
          <li key={idx} onClick={() => setSortAndOrder({ ...sortAndOrder, order: ordering })} className={`cursor-pointer ${sortAndOrder.order === ordering ? '' : 'opacity-50'}`}>
            · <span>{handleText(ordering)}</span>
          </li>
        ))}
      </div>
    </ul>
  );
}
