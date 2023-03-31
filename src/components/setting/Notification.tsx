import { useEffect, useState } from 'react';
import { BsBellFill } from 'react-icons/bs';
import Toggle from '../common/Toggle';

export default function Notification() {
  type NotificationType = {
    [key: string]: boolean;
    all: boolean;
    chat: boolean;
    comment: boolean;
  };

  const notificationString = localStorage.getItem('notification');
  const initialNotification = notificationString
    ? JSON.parse(notificationString)
    : {
        all: false,
        chat: false,
        comment: false,
      };

  const [notification, setNotification] = useState<NotificationType>(initialNotification);

  const setNoti = (noti: keyof NotificationType) => {
    if (noti === 'all') {
      setNotification((notification) => {
        return { [noti]: !notification[noti], chat: notification[noti], comment: notification[noti] };
      });
    } else {
      if (notification.all === true) {
        return;
      } else {
        setNotification((notification) => {
          return { ...notification, [noti]: !notification[noti] };
        });
      }
    }
  };

  const handleToggle = (e: any) => {
    const noti = e.currentTarget.id;
    if (noti === 'all') {
      setNoti('all');
    } else if (noti === 'chat') {
      setNoti('chat');
    } else {
      setNoti('comment');
    }
  };

  useEffect(() => {
    localStorage.setItem('notification', JSON.stringify(notification));
  }, [notification]);

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-[#ffffff50] pb-5 text-[22px] font-semibold">
        <BsBellFill size="23" />
        <p>알림 설정</p>
      </div>
      <div className="flex flex-col text-xl">
        <div onClick={(e) => handleToggle(e)} id="all" className="flex items-center justify-between">
          <p className="grow cursor-pointer py-2">알림 모두 끄기</p>
          <Toggle isOn={notification.all} />
        </div>
        <div onClick={(e) => handleToggle(e)} id="chat" className="flex items-center justify-between">
          <p className="grow cursor-pointer py-2">팔로우 알림</p>
          <Toggle isOn={notification.chat} />
        </div>
        <div onClick={(e) => handleToggle(e)} id="comment" className="flex items-center justify-between">
          <p className="grow cursor-pointer py-2">댓글 알림</p>
          <Toggle isOn={notification.comment} />
        </div>
      </div>
    </div>
  );
}
