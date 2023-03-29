import { FcHome, FcReadingEbook } from 'react-icons/fc';
import { BsBellFill } from 'react-icons/bs';

export default function HomeTitle() {
  return (
    <div className="mb-6 text-[26px] font-bold text-white">
      <div className="mb-2 flex h-[26px] items-center justify-between">
        <div className="flex items-center">
          <FcHome className="mr-2" /> {`Kody님`}
        </div>
        <div>
          <BsBellFill size="20" className="cursor-pointer" />
        </div>
      </div>
      <div>오늘도 수고했어요!</div>
      <div className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[16px] font-medium opacity-60">
        <FcReadingEbook /> KodywiththeK
      </div>
    </div>
  );
}
