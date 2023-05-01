import { useRecoilState } from 'recoil';
import { communitySorting } from '../../store/recoil/communitySorting';
import { OrderType, SortType } from './_Community.interface';

export default function CommunitySort() {
  //Recoil
  const [sortAndOrder, setSortAndOrder] = useRecoilState(communitySorting);

  const sort = ['DATE', 'HIT', 'LIKE'] as SortType[];
  const order = ['DESC', 'ASC'] as OrderType[];

  const handleText = (text: OrderType | SortType) => {
    if (text === 'DATE') return '최신순';
    if (text === 'HIT') return '인기순';
    if (text === 'LIKE') return '좋아요순';
    if (text === 'ASC') return '오름차순';
    if (text === 'DESC') return '내림차순';
  };

  return (
    <div className="flex h-[40px] w-full items-center justify-between rounded-[20px] bg-pointGreen px-4 text-xs text-white dark:bg-lightNavy">
      <ul className="flex items-center gap-2">
        {sort?.map((sorting, idx) => (
          <li key={idx} onClick={() => setSortAndOrder({ ...sortAndOrder, sort: sorting })} className={`cursor-pointer ${sortAndOrder.sort === sorting ? '' : 'opacity-50'}`}>
            <span>· {handleText(sorting)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        {order?.map((ordering, idx) => (
          <li key={idx} onClick={() => setSortAndOrder({ ...sortAndOrder, order: ordering })} className={`cursor-pointer list-none ${sortAndOrder.order === ordering ? '' : 'opacity-50'}`}>
            <span>· {handleText(ordering)}</span>
          </li>
        ))}
      </div>
    </div>
  );
}
