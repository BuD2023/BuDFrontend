import { FcApproval, FcCalendar, FcCloseUpMode } from 'react-icons/fc';

export default function HomeCommitSection() {
  return (
    <div className="relative flex min-h-[260px] w-full flex-col">
      <div className="absolute inset-0 flex flex-col justify-between rounded-[50px] bg-[#E8E1C1] p-10 text-[#392F31] dark:bg-midNavy dark:text-white">
        <div className="text-[26px] font-bold">커밋 기록</div>
        <div className="flex justify-around text-[45px]">
          <FcApproval />
          <FcCalendar />
          <FcCloseUpMode />
        </div>
        <div className="flex justify-around text-[45px]">
          <div className="text-center ">
            <p className="text-[24px] font-bold">2개</p>
            <p className="mt-2 text-[18px] font-bold">오늘</p>
          </div>
          <div className="text-center ">
            <p className="text-[24px] font-bold">3개</p>
            <p className="mt-2 text-[18px] font-bold">이번 주</p>
          </div>
          <div className="text-center ">
            <p className="text-[24px] font-bold">2일</p>
            <p className="mt-2 text-[18px] font-bold">연속</p>
          </div>
        </div>
      </div>
    </div>
  );
}
