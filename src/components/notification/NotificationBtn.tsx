import { throttle } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNotificationListQuery, useReadAllNotificationQuery } from '../../store/module/useNotificationQuery';

export default function NotificationBtn() {
  const [showBtn, setShowBtn] = useState(false);
  const beforeScrollY = useRef(0);

  const { refetch } = useNotificationListQuery();

  const { mutateAsync: readAllNotisMutateAsync } = useReadAllNotificationQuery();

  const handleClickReadAllNotis = async () => {
    await readAllNotisMutateAsync();
    refetch();
  };

  const handleShowButton = useMemo(
    () =>
      throttle(() => {
        if (window.scrollY > 700) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
      }, 250),
    [beforeScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <>
      {showBtn && (
        <div className="fixed bottom-[46px] z-10 flex w-full justify-center gap-4 font-bold ">
          <div
            onClick={handleClickReadAllNotis}
            className="flex min-h-[50px] min-w-[153px] cursor-pointer items-center justify-center rounded-full bg-pointGreen p-3 text-center text-base text-white drop-shadow-md transition-all dark:bg-sky"
          >
            <span>알림 모두 읽기</span>
          </div>
          <div className="flex min-h-[50px] min-w-[153px] cursor-pointer items-center justify-center rounded-full bg-white p-3 text-center text-base text-pointGreen drop-shadow-md transition-all dark:text-sky">
            <span>읽은 알림 모두 삭제</span>
          </div>
        </div>
      )}
    </>
  );
}
