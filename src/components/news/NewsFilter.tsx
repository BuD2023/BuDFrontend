interface INewsFilterPropsType {
  setFilter: (x: boolean) => void;
  setSort: (x: boolean) => void;
  sort: boolean;
}

export default function NewsFilter({ setFilter, setSort, sort }: INewsFilterPropsType) {
  return (
    <ul className="dark:text- flex h-[40px] items-center justify-between gap-4 rounded-[20px] bg-pointGreen px-4 text-xs  text-white dark:bg-lightNavy">
      <div className="flex items-center gap-4">
        <li onClick={() => setSort(false)} className={'cursor-pointer ' + (sort ? 'opacity-50' : '')}>
          · 인기순
        </li>
        <li onClick={() => setSort(true)} className={'cursor-pointer ' + (sort ? '' : 'opacity-50')}>
          · 최신순
        </li>
      </div>
      <button onClick={() => setFilter(true)} className="cursor-pointer">
        ✨키워드 필터
      </button>
    </ul>
  );
}
