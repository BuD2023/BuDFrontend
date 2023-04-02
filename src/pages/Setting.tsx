import Account from '../components/setting/Account';
import Theme from '../components/setting/Theme';
import Notification from '../components/setting/Notification';
import Header from '../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';

export default function Setting() {
  return (
    <section>
      <div className="flex min-h-[calc(100vh-160px)] flex-col gap-7 py-4 px-6 text-lightText dark:text-white">
        <Header type="setting" title="설정" icon={<BsChevronLeft />} />
        <div className="mt-9 flex h-full flex-col gap-7 p-4 px-2">
          <Account />
          <Theme />
          <Notification />
        </div>
      </div>
    </section>
  );
}
