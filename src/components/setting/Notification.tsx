import { useEffect, useState } from 'react';
import { BsBellFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { usePutNotificationInfoMutation } from '../../store/module/useSettingQuery';
import { loginUserInfo } from '../../store/recoil/user';
import Toggle from '../common/Toggle';
import { NotificationType } from './_Setting.interface';

export default function Notification() {
  const notificationString = localStorage.getItem('notification');
  const initialNotification = notificationString
    ? JSON.parse(notificationString)
    : {
        all: false,
        follow: false,
        post: false,
      };

  const [notification, setNotification] = useState<NotificationType>(initialNotification);

  // 사용자 정보
  const logInUserInfo = useRecoilValue(loginUserInfo);

  const setNoti = (noti: keyof NotificationType) => {
    if (noti === 'all') {
      setNotification((notification) => {
        return { [noti]: !notification[noti], follow: notification[noti], post: notification[noti] };
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

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    const noti = e.currentTarget.id;
    if (noti === 'all') {
      setNoti('all');
    } else if (noti === 'follow') {
      setNoti('follow');
    } else {
      setNoti('post');
    }
  };

  const body = { isPostPushAvailable: notification.post, isFollowPushAvailable: notification.follow };
  const { mutate } = usePutNotificationInfoMutation(logInUserInfo?.id as number, body);

  useEffect(() => {
    localStorage.setItem('notification', JSON.stringify(notification));
    mutate();
  }, [notification]);

  return (
    <div className="mb-4 flex flex-col gap-4 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
      <div className="flex items-center gap-3 text-[22px] font-semibold dark:border-[#ffffff50]">
        <BsBellFill size="23" />
        <p>알림 설정</p>
      </div>
      <div className="flex flex-col text-xl">
        <div
          onClick={(e) => handleToggle(e)}
          id="all"
          className="flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-sky dark:hover:bg-opacity-50"
        >
          <p className="grow">알림 모두 끄기</p>
          <Toggle isOn={notification.all} />
        </div>
        <div
          onClick={(e) => handleToggle(e)}
          id="follow"
          className="flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-sky dark:hover:bg-opacity-50"
        >
          <p className="grow">팔로우 알림</p>
          <Toggle isOn={notification.follow} />
        </div>
        <div
          onClick={(e) => handleToggle(e)}
          id="post"
          className="flex cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-sky dark:hover:bg-opacity-50"
        >
          <p className="grow">게시글 알림</p>
          <Toggle isOn={notification.post} />
        </div>
      </div>
    </div>
  );
}
