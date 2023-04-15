import { AiFillGithub } from 'react-icons/ai';
import { FcReadingEbook } from 'react-icons/fc';
import profile1 from '../../assets/profile1.jpg';

interface MyProfileHeaderPropsType {
  userId: string;
  nickName: string;
  description: string;
  profileUrl: string;
}

export default function OtherProfileHeader({ userId, nickName, description, profileUrl }: MyProfileHeaderPropsType) {
  return (
    <div className="text-lighText flex w-full justify-between gap-4 text-[26px] font-bold dark:text-white">
      <div className="flex w-full flex-col gap-2.5">
        <div className="mb-2 flex h-[26px] items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-0.5">
              <FcReadingEbook size={30} />
            </div>
            <h1>{nickName}</h1>
          </div>
        </div>
        <div className="mb-1 flex items-center gap-2 text-[16px] font-medium">
          <AiFillGithub onClick={() => window.open(`https://github.com/${userId}`)} className="cursor-pointer opacity-60" />
          <span onClick={() => window.open(`https://github.com/${userId}`)} className="cursor-pointer opacity-60 hover:underline">
            {userId}
          </span>
        </div>
        <div className="min-h-[40px] w-full rounded-2xl bg-white p-2.5 text-sm font-semibold leading-[1.2] opacity-70 dark:bg-midNavy dark:text-white dark:opacity-100">
          <div className="dark:font-normal">{description ?? `${nickName}님의 프로필입니다.`}</div>
        </div>
      </div>
      <img src={profileUrl ?? profile1} className="h-[120px] w-[120px] shrink-0 rounded-full object-cover" />
    </div>
  );
}
