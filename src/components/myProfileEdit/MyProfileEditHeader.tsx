import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import MainBtn from '../common/MainBtn';

export default function MyProfileEditHeader() {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 z-10 w-full border-b-[0.5px] border-b-black border-opacity-20 bg-lightIvory pb-4 text-2xl dark:bg-darkNavy">
      <div className=" flex w-full items-center justify-between px-4">
        <BsChevronLeft onClick={() => navigate('/myProfile')} className="mr-[24px] cursor-pointer" />
        <h1 className="flex grow basis-[0] items-center justify-center gap-2 text-[26px] font-bold">프로필 수정</h1>
        <MainBtn content={'완료'} size={20} />
      </div>
    </div>
  );
}
