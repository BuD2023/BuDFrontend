import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Account from '../components/setting/Account';
import Theme from '../components/setting/Theme';
import Notification from '../components/setting/Notification';

export default function Setting() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex min-h-[calc(100vh-160px)] flex-col gap-7 py-4 px-6 pt-16 text-lightText dark:text-white">
        <div className="fixed left-0 top-0 z-10 w-full border-b-[0.5px] border-b-black border-opacity-20 bg-lightIvory pb-4 text-2xl dark:bg-darkNavy">
          <div className="mt-16 flex items-center px-4">
            <div className="shrink-0 grow basis-[0]">
              <BsChevronLeft onClick={() => navigate('/myProfile')} className="cursor-pointer" />
            </div>
            <h1 className="flex grow items-center gap-2 text-[26px] font-bold">설정</h1>
          </div>
        </div>
        <div className="mt-14 flex h-full flex-col gap-7 p-4">
          <Account />
          <Theme />
          <Notification />
        </div>
      </div>
    </section>
  );
}
