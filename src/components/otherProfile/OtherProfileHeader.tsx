import { AiFillEdit, AiFillGithub } from 'react-icons/ai';
import { FcReadingEbook } from 'react-icons/fc';
import { S3_URL } from '../../constant/union';
import { UserProfileHeaderPropsType } from './_OtherProfile.interface';

export default function OtherProfileHeader({ userId, nickName, description, profileUrl, isLoading, job, memberStatus }: UserProfileHeaderPropsType) {
  if (isLoading) {
    return (
      <div className="h-[120px] w-full">
        <div className="flex w-full justify-between gap-4">
          <div className="w-full"></div>
          <div className="h-[120px] w-[120px] shrink-0 rounded-full bg-greyBeige dark:bg-sky"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-lighText flex w-full justify-between gap-4 text-[26px] font-bold dark:text-white">
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex min-h-[26px] items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-0.5">
              <FcReadingEbook size={30} />
            </div>
            <h1>{nickName}</h1>
          </div>
        </div>
        <div className="my-1 flex flex-col gap-2 text-[16px] font-medium opacity-60">
          <div className="flex gap-2">
            <AiFillEdit />
            <span>{job}</span>
          </div>
          {memberStatus !== 'WITHDREW' && (
            <div className="flex gap-2">
              <AiFillGithub onClick={() => window.open(`https://github.com/${userId}`)} className="cursor-pointer" />
              <span onClick={() => window.open(`https://github.com/${userId}`)} className="cursor-pointer">
                {userId}
              </span>
            </div>
          )}
        </div>
        <div className="min-h-[40px] w-full rounded-2xl bg-white p-2.5 text-sm font-semibold leading-[1.2] opacity-70 dark:bg-midNavy dark:text-white dark:opacity-100">
          <div className="dark:font-normal">{description ?? `${nickName}님의 프로필입니다.`}</div>
        </div>
      </div>
      <img src={S3_URL + profileUrl} alt={profileUrl} className="h-[120px] w-[120px] shrink-0 rounded-full object-cover" />
    </div>
  );
}
