import { BsChevronLeft } from 'react-icons/bs';
import Header from '../../components/common/Header';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';
import NotificationBtn from '../../components/notification/NotificationBtn';
import NotificationContent from '../../components/notification/NotificationContent';

export default function Notification() {
  return (
    <section className="flex min-h-[calc(100vh-160px)] flex-col gap-7 py-2 text-lightText dark:text-white">
      <ScrollToTopBtn />
      <NotificationBtn />
      <Header type="setting" title="알림" icon={<BsChevronLeft />} />
      <NotificationContent />
    </section>
  );
}
