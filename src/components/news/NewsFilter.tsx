const orders = ['최신순', '인기순'];

interface INewsFilterPropsType {
  setFilter: (x: boolean) => void;
}

export default function NewsFilter({ setFilter }: INewsFilterPropsType) {
  return (
    <ul className="dark:text- flex h-[40px] items-center justify-between gap-4 rounded-[20px] bg-pointGreen px-4 text-xs font-bold text-white dark:bg-lightNavy">
      <div className="flex items-center gap-4">
        {orders.map((order) => (
          <li key={order} className="cursor-pointer">
            · {order}
          </li>
        ))}
      </div>
      <button onClick={() => setFilter(true)} className="cursor-pointer">
        ✨키워드 필터
      </button>
    </ul>
  );
}
