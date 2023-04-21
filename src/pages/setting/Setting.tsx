import { BsChevronLeft } from 'react-icons/bs';
import Header from '../../components/common/Header';
import Account from '../../components/setting/Account';
import Notification from '../../components/setting/Notification';
import Theme from '../../components/setting/Theme';

export default function Setting() {
  return (
    <section>
      <div className="flex min-h-[calc(100vh-160px)] flex-col gap-7 px-6 py-4 text-lightText dark:text-white">
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
