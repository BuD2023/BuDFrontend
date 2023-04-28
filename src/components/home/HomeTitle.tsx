import { FcHome } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Header from '../common/Header';
import { HomeTitlePropsType } from './_Home.interface';
import { useMyProfileQuery } from '../../store/module/useMyProfileQuery';
import { useGithubMutation } from '../../store/module/useGithubQuery';

export default function HomeTitle({ isLoading }: HomeTitlePropsType) {
  const { data } = useMyProfileQuery();

  const { mutate: postGithub, isLoading: postGithubIsLoading } = useGithubMutation();

  if (isLoading) {
    return <div className="mb-6 h-[60px]"></div>;
  }

  return (
    <div className="mb-6 text-[26px] font-bold ">
      <div className="flex">
        <Header type="category" title={`${data?.nickName}님`} restart={postGithub} isLoading={postGithubIsLoading} icon={<FcHome />} />
      </div>
      <div>오늘도 수고했어요!</div>
      <div onClick={() => window.open(`https://github.com/${data?.userId}`, '_blank')} className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[16px] font-medium opacity-70">
        <AiFillGithub /> {data?.userId}
      </div>
    </div>
  );
}
