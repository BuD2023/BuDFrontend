import { FcHome } from 'react-icons/fc';
import { BsBellFill } from 'react-icons/bs';
import { AiFillGithub } from 'react-icons/ai';
import NotiBtn from '../common/NotiBtn';

export default function HomeTitle() {
  return (
    <div className="mb-6 text-[26px] font-bold ">
      <div className="mb-2 flex h-[26px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-1">
            <FcHome />
          </div>
          <h1>{`Kody님`}</h1>
        </div>
        <div>
          <NotiBtn />
        </div>
      </div>
      <div>오늘도 수고했어요!</div>
      <div className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[16px] font-medium opacity-70">
        <AiFillGithub /> KodywiththeK
      </div>
    </div>
  );
}
