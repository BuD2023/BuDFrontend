import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeLevelSectionProps } from './_Home.interface';

export default function HomeLevelSection({ levelCode, remainCommitCountNextLevel, isLoading }: HomeLevelSectionProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="relative min-h-[236px] w-full rounded-[50px] bg-midIvory dark:bg-midNavy"></div>;
  }

  return (
    <div className="relative flex min-h-[236px] w-full cursor-pointer flex-col">
      <div onClick={() => navigate('/userInfo')} className="absolute inset-0 flex flex-col justify-between rounded-[50px] bg-midIvory p-10 pb-6 dark:bg-midNavy ">
        <div className="flex w-full justify-between">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="text-[26px] font-bold">{levelCode?.replace('_', ' ')}</div>
              <div className="mt-5 text-[20px]">{levelCode?.slice(-2)}</div>
            </div>
            <div className="text-[100px]">🌱</div>
          </div>
        </div>
        <div className="my-2 flex justify-center text-[17px] font-bold leading-6">
          <span className="break-keep text-center">
            🥜 다음 성장까지 <span className="text-[19px] text-[#327559] dark:text-[#4DCE8F]">{remainCommitCountNextLevel} </span>
            남았어요!
          </span>
        </div>
      </div>
    </div>
  );
}
