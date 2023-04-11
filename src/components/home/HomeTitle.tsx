import { FcHome } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Header from '../common/Header';

export default function HomeTitle() {
  return (
    <div className="mb-6 text-[26px] font-bold ">
      <div className="flex">
        <Header type="category" title="Kody님" restart={true} icon={<FcHome />} />
      </div>
      <div>오늘도 수고했어요!</div>
      <div className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[16px] font-medium opacity-70">
        <AiFillGithub /> KodywiththeK
      </div>
    </div>
  );
}
