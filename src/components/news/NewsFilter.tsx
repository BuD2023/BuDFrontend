import React from 'react';

const orders = ['최신순', '인기순', '인기순2'];

export default function NewsFilter() {
  return (
    <ul className="dark:text- flex h-[40px] items-center gap-4 rounded-[20px] bg-pointGreen px-4 text-xs font-bold text-white dark:bg-lightNavy">
      {orders.map((order) => (
        <li key={order} className="cursor-pointer">
          · {order}
        </li>
      ))}
    </ul>
  );
}
