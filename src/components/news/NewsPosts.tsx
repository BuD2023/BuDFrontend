import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IBlogData } from '../../store/dummy';

interface INewsPostsPropsType {
  newsData: IBlogData[];
}

export default function NewsPosts({ newsData }: INewsPostsPropsType) {
  const navigate = useNavigate();

  return (
    <ul>
      {newsData.map((data) => (
        <li onClick={() => navigate(`/newsDetail/${data.id}`)} key={data.id} className="mb-4 flex h-[115px] cursor-pointer items-center gap-1 rounded-[20px] bg-midIvory dark:bg-midNavy">
          <div className="shrink-0">
            <img src={data.img} alt={data.title} className="w-[115px] rounded-[20px]" />
          </div>
          <div className="w-full overflow-hidden pl-3 pr-5">
            <h1 className="mb-2 truncate text-base font-bold">{data.title}</h1>
            <p className="ellipsis mb-3 text-[13px] leading-4">{data.detail}</p>
            <div className="flex justify-between">
              <p className="text-xs opacity-50">조회수 {data.view}</p>
              <p className="text-xs opacity-50">{data.createdAt}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
