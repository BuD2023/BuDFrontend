import { S3_URL } from '../../constant/union';
import { useNotificationListQuery, useReadAllNotificationQuery, useDeleteReadAllNotificationMutation, useUnreadNotificationCountQuery } from '../../store/module/useNotificationQuery';

export default function NotificationBtn() {
  const { refetch: notificationListRefetch } = useNotificationListQuery();
  const { data, refetch: unReadCountRefetch } = useUnreadNotificationCountQuery();
  const { mutateAsync: readAllNotisMutateAsync } = useReadAllNotificationQuery();
  const { mutateAsync: deleteAllReadNotiMutateAsync } = useDeleteReadAllNotificationMutation();

  const handleClickReadAllNotis = async () => {
    await readAllNotisMutateAsync();
    await notificationListRefetch();
    unReadCountRefetch();
  };
  const handleClickDeleteAllNotis = async () => {
    await deleteAllReadNotiMutateAsync();
    await notificationListRefetch();
    unReadCountRefetch();
  };

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomPinNum = getRandomInt(2, 10);

  return (
    <>
      {data && data?.unreadCount > 0 ? (
        <div className="fixed bottom-[46px] z-10 flex w-full justify-center gap-4 font-bold ">
          <div
            onClick={handleClickReadAllNotis}
            className="flex min-h-[50px] min-w-[153px] cursor-pointer items-center justify-center rounded-full bg-pointGreen p-3 text-center text-base text-white drop-shadow-md transition-all dark:bg-sky"
          >
            <span>알림 모두 읽기</span>
          </div>
          <div
            onClick={handleClickDeleteAllNotis}
            className="flex min-h-[50px] min-w-[153px] cursor-pointer items-center justify-center rounded-full bg-white p-3 text-center text-base text-pointGreen drop-shadow-md transition-all dark:text-sky"
          >
            <span>읽은 알림 모두 삭제</span>
          </div>
        </div>
      ) : (
        <>
          {data && (
            <div className="relative mt-8 flex min-h-[calc(100vh-164px)] w-full flex-col items-center justify-center gap-4 p-4 text-lightText dark:text-white">
              <img src={S3_URL + 'levels/lv' + randomPinNum + 'L.png'} alt="notiImg" className="aspect-square w-[200px] opacity-75 brightness-[2] dark:opacity-70 dark:brightness-[1]" />
              <span className="text-xl opacity-50">새 알림이 없어요!</span>
            </div>
          )}
        </>
      )}
    </>
  );
}
