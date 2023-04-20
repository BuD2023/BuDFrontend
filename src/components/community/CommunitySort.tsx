import { OrderType, SortAndOrderType, SortType } from './_Community.interface';

interface ICommunitySortPropsType {
  sortAndOrder: SortAndOrderType;
  setSortAndOrder: ({}: SortAndOrderType) => void;
}

export default function CommunitySort({ setSortAndOrder, sortAndOrder }: ICommunitySortPropsType) {
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
    <ul className="flex h-[40px] w-full items-center justify-between rounded-[20px] bg-pointGreen px-4 text-xs text-white dark:bg-lightNavy">
      <div className="flex items-center gap-2">
        {sort.map((sorting, idx) => (
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
