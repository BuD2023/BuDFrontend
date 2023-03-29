import { FcGlobe, FcHome, FcIcons8Cup, FcNews, FcReadingEbook } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export default function FooterMenu() {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[95px] bg-darkNavy"></div>
      <div className="fixed bottom-0 z-30 flex h-[95px] w-full items-center justify-around rounded-t-[40px] bg-[#383030] pb-2 text-[14px] text-white">
        <div onClick={() => navigate('/')} className="flex cursor-pointer flex-col items-center">
          <FcHome className="text-[32px]" />
          <span className="mt-2">홈</span>
        </div>
        <div onClick={() => navigate('/news')} className="flex cursor-pointer flex-col items-center">
          <FcNews className="text-[32px]" />
          <span className="mt-2">IT 소식</span>
        </div>
        <div onClick={() => navigate('/community')} className="flex cursor-pointer flex-col items-center">
          <FcGlobe className="text-[32px]" />
          <span className="mt-2">커뮤니티</span>
        </div>
        <div onClick={() => navigate('/coffeeChat')} className="flex cursor-pointer flex-col items-center">
          <FcIcons8Cup className="text-[32px]" />
          <span className="mt-2">커피챗</span>
        </div>
        <div onClick={() => navigate('/myProfile')} className="flex cursor-pointer flex-col items-center">
          <FcReadingEbook className="text-[32px]" />
          <span className="mt-2">마이</span>
        </div>
      </div>
    </>
  );
}
