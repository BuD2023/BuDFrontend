import React from 'react';

interface ICommunitySortPropsType {
  setSort: (x: string) => void;
}

export default function CommunitySort({ setSort }: ICommunitySortPropsType) {
  const orders = ['최신순', '인기순', '팔로우 게시글만 보기'];

  return (
    <ul className="flex h-[40px] w-full items-center gap-4 rounded-[20px] bg-pointGreen px-4 text-xs font-bold text-white dark:bg-lightNavy">
      {orders.map((order, idx) => (
        <li key={order} onClick={() => (order === '최신순' ? setSort('recent') : setSort('popular'))} className={`cursor-pointer ${orders.length - 1 === idx ? 'text-white' : ''}`}>
          · {order}
        </li>
      ))}
    </ul>
  );
}
