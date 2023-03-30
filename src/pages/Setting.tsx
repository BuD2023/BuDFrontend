import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Account from '../components/setting/Account';
import Theme from '../components/setting/Theme';
import Notification from '../components/setting/Notification';

export default function Setting() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="mt-16 flex flex-col gap-7 py-4 px-6 text-white">
        <div className="fixed left-0 top-0 z-10 w-full bg-darkNavy pb-4 text-2xl">
          <div className="mt-16 flex items-center px-4">
            <div className="shrink-0 grow basis-[0]">
              <BsChevronLeft onClick={() => navigate('/myProfile')} className="cursor-pointer" />
            </div>
            <h1 className="flex grow basis-[0] items-center gap-2 text-[26px] font-bold">설정</h1>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-7 p-4">
          <Account />
          <Theme />
          <Notification />
        </div>
      </div>
    </section>
  );
}
