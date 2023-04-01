import Account from '../components/setting/Account';
import Theme from '../components/setting/Theme';
import Notification from '../components/setting/Notification';
import SettingHeader from '../components/setting/SettingHeader';

export default function Setting() {
  return (
    <section>
      <div className="flex min-h-[calc(100vh-160px)] flex-col gap-7 py-4 px-6 pt-16 text-lightText dark:text-white">
        <SettingHeader />
        <div className="mt-14 flex h-full flex-col gap-7 p-4">
          <Account />
          <Theme />
          <Notification />
        </div>
      </div>
    </section>
  );
}
