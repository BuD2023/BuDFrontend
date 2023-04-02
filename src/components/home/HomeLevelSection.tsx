import { useNavigate } from 'react-router-dom';

export default function HomeLevelSection() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/userInfo')} className="relative flex min-h-[236px] w-full cursor-pointer flex-col">
      <div className="absolute inset-0 flex flex-col justify-between rounded-[50px] bg-[#E8E1C1] p-10 pb-6 dark:bg-midNavy ">
        <div className="flex w-full justify-between">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="text-[26px] font-bold">행복한 새싹</div>
              <div className="mt-5 text-[20px]">새싹</div>
            </div>
            <div className="text-[100px]">🌱</div>
          </div>
        </div>
        <div className="my-2 flex justify-center text-[17px] font-bold leading-6">
          <span className="break-keep text-center">
            🥜 다음 성장까지 <span className="text-[19px] text-[#327559] dark:text-[#4DCE8F]">15커밋 </span>
            남았어요!
          </span>
        </div>
      </div>
    </div>
  );
}
