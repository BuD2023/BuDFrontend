import { AiFillGithub, AiFillSetting } from 'react-icons/ai';
import { FcReadingEbook } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import profile1 from '../../assets/profile1.jpg';

export default function MyProfileHeader() {
  const navigate = useNavigate();
  const githubID = 'jameskim97';

  return (
    <div className="text-lighText flex w-full justify-between gap-4 text-[26px] font-bold dark:text-white">
      <div className="flex w-full flex-col gap-2.5">
        <div className="mb-2 flex h-[26px] items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-0.5">
              <FcReadingEbook size={30} />
            </div>
            <h1>{`Kody님`}</h1>
          </div>
          <div onClick={() => navigate('/setting')} className="flex cursor-pointer items-center justify-center rounded-full bg-darkIvory dark:bg-lightNavy">
            <AiFillSetting className="box-content p-1 text-[18px] text-white opacity-80" />
          </div>
        </div>
        <div className="mb-1 flex items-center gap-2 text-[16px] font-medium">
          <AiFillGithub className="cursor-pointer opacity-60" onClick={() => window.open(`https://github.com/${githubID}`)} />
          <span className="cursor-pointer opacity-60 hover:underline" onClick={() => window.open(`https://github.com/${githubID}`)}>
            {githubID}
          </span>
        </div>
        <div className="min-h-[40px] w-full rounded-2xl bg-white p-2.5 text-sm font-semibold leading-[1.2] opacity-70 dark:bg-midNavy dark:text-white dark:opacity-100">
          <div className="dark:font-normal">안녕하세요 FE_김동성입니다. 이곳에는 간단한 자기소개를 적어보아요~ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ</div>
        </div>
      </div>
      <img src={profile1} className="h-[120px] w-[120px] rounded-full" />
    </div>
  );
}
