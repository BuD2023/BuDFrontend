import { useEffect } from 'react';
import { BsChevronLeft, BsFillTrophyFill, BsFire, BsGithub, BsQuote } from 'react-icons/bs';
import { RiLeafFill } from 'react-icons/ri';
import Header from '../../components/common/Header';
import LevelImgList from '../../components/setting/LevelImgList';
import { useGithubQuery } from '../../store/module/useGithubQuery';
import { useMyProfileQuery } from '../../store/module/useMyProfileQuery';

export default function UserInfo() {
  const { data: userInfo } = useMyProfileQuery();
  const { data: githubInfo, isLoading, refetch } = useGithubQuery();
  useEffect(() => {
    refetch().then(() => console.log(githubInfo));
  }, [isLoading]);
  return (
    <section className="flex min-h-[calc(100vh-160px)] flex-col gap-7 px-6 py-4 text-lightText dark:text-white">
      <div className="fixed left-0 top-0 z-10 w-full bg-lightIvory pb-4 text-2xl dark:bg-darkNavy">
        <Header type="setting" title="회원 정보 조회" icon={<BsChevronLeft />} />
      </div>
      <ul className="mt-9 flex h-full flex-col gap-7 p-4 px-2">
        <li className="b-4 flex flex-col gap-4 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
          <p className="flex gap-2 text-[22px] font-bold">
            <BsQuote />
            닉네임
          </p>
          <p className="py-2 text-xl">{userInfo?.nickName}</p>
        </li>
        <li className="b-4 flex flex-col gap-4 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
          <p className="flex gap-2 text-[22px] font-bold">
            <BsGithub />
            깃허브 아이디
          </p>
          <p className="py-2 text-xl">{userInfo?.userId}</p>
        </li>
        <li className="b-4 flex flex-col gap-4 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
          <p className="flex gap-2 text-[22px] font-bold">
            <BsFire />
            현재 총 커밋 개수
          </p>

          <p className="py-2 text-xl">{githubInfo?.totalCommitCount as number}</p>
        </li>
        <li className="b-4 flex flex-col gap-4 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
          <p className="flex gap-2 text-[22px] font-bold">
            <RiLeafFill />
            성장 레벨
          </p>
          <p className="py-2 text-xl">{userInfo?.level}</p>
        </li>
        <li className="b-4 flex flex-col gap-6 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
          <p className="flex gap-2 text-[22px] font-bold">
            <BsFillTrophyFill />
            성장 레벨 아이콘 컬렉션
          </p>
          <LevelImgList />
        </li>
      </ul>
    </section>
  );
}
