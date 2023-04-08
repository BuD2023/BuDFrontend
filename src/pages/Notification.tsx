import { BsChevronLeft } from 'react-icons/bs';
import Header from '../components/common/Header';
import NotificationContent from '../components/notification/NotificationContent';

export default function Notification() {
  return (
    <section className="flex min-h-[calc(100vh-160px)] flex-col gap-7 px-6 py-4 text-lightText dark:text-white">
      <Header type="setting" title="알림" icon={<BsChevronLeft />} />
      <NotificationContent />
    </section>
  );
}
