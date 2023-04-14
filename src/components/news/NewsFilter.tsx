import { INewsFilterPropsType } from './_News.interface';

export default function NewsFilter({ setFilter, setSort, sort, setOrder, order }: INewsFilterPropsType) {
  const sortList = ['인기순', '최신순'];
  const orderList = ['오름차순', '내림차순'];

  return (
    <ul className="dark:text- flex h-[40px] items-center justify-between gap-4 rounded-[20px] bg-pointGreen px-4 text-xs  text-white dark:bg-lightNavy">
      <div className="flex items-center gap-2">
        {sortList.map((sorting) => (
          <li
            key={sorting}
            onClick={() => {
              sorting === '인기순' ? setSort(false) : setSort(true);
            }}
            className={'cursor-pointer ' + ((sort && sorting === '인기순') || (!sort && sorting === '최신순') ? 'opacity-50' : '')}
          >
            · {sorting}
          </li>
        ))}
        {orderList.map((ordering) => (
          <li
            key={ordering}
            onClick={() => {
              ordering === '오름차순' ? setOrder(false) : setOrder(true);
            }}
            className={'cursor-pointer ' + ((order && ordering === '오름차순') || (!order && ordering === '내림차순') ? 'opacity-50' : '')}
          >
            · {ordering}
          </li>
        ))}
      </div>
      <button onClick={() => setFilter(true)} className="cursor-pointer">
        ✨키워드 필터
      </button>
    </ul>
  );
}
