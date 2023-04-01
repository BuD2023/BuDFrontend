import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { user } from '../store/dummy';

export default function UserInfo() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="mt-16 flex min-h-[calc(100vh-160px)] flex-col gap-7 py-4 px-6 text-lightText dark:text-white">
        <div className="fixed left-0 top-0 z-10 w-full bg-lightIvory pb-4 text-2xl dark:bg-darkNavy">
          <div className="mt-16 flex items-center px-4">
            <div className="shrink-0 grow">
              <BsChevronLeft onClick={() => navigate('/setting')} className="cursor-pointer" />
            </div>
            <h1 className="flex grow items-center gap-2 text-[26px] font-bold">회원 정보 조회</h1>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-7 p-4">
          <div className="flex justify-between">
            <p>깃허브 아이디</p>
            <p>{user.githubId}</p>
          </div>
          <div className="flex justify-between">
            <p>현재 커밋 개수</p>
            <p>{user.totalComitCount} 개</p>
          </div>
          <div className="flex justify-between">
            <p>닉네임</p>
            <p>{user.nickName}</p>
          </div>
          <div className="flex justify-between">
            <p>성장 레벨</p>
            <p>Lv {user.grwoLevel}</p>
          </div>
          <div>
            <p>성장 레벨 아이콘 컬렉션</p>
            {/* <p>{user.githubId}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
