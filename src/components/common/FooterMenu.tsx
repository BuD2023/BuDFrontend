import { FcGlobe, FcHome, FcIcons8Cup, FcNews, FcReadingEbook } from 'react-icons/fc';

export default function FooterMenu() {
  return (
    <>
      <div className="h-[95px]"></div>
      <div className="fixed bottom-0 z-30 flex h-[95px] w-full items-center justify-around rounded-t-[40px] bg-[#383030] pb-2 text-[16px] text-white">
        <div className="flex cursor-pointer flex-col items-center">
          <FcHome className="text-[32px]" />
          <span className="mt-2">홈</span>
        </div>
        <div className="flex cursor-pointer flex-col items-center">
          <FcNews className="text-[32px]" />
          <span className="mt-2">뉴스</span>
        </div>
        <div className="flex cursor-pointer flex-col items-center">
          <FcGlobe className="text-[32px]" />
          <span className="mt-2">커뮤니티</span>
        </div>
        <div className="flex cursor-pointer flex-col items-center">
          <FcIcons8Cup className="text-[32px]" />
          <span className="mt-2">커피챗</span>
        </div>
        <div className="flex cursor-pointer flex-col items-center">
          <FcReadingEbook className="text-[32px]" />
          <span className="mt-2">마이</span>
        </div>
      </div>
    </>
  );
}
