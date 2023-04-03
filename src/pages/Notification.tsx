import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import NotificationContent from '../components/notification/NotificationContent';

export default function Notification() {
  return (
    <section>
      <div className="flex min-h-[calc(100vh-160px)] flex-col gap-7 py-4 px-6 text-lightText dark:text-white">
        <Header type="setting" title="알림" icon={<BsChevronLeft />} />
        <NotificationContent />
      </div>
    </section>
  );
}
