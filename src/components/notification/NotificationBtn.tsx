import { useNotificationListQuery, useReadAllNotificationQuery, useDeleteReadAllNotificationMutation, useUnreadNotificationCountQuery } from '../../store/module/useNotificationQuery';

export default function NotificationBtn() {
  const { refetch } = useNotificationListQuery();
  const { refetch: unReadCountRefetch } = useUnreadNotificationCountQuery();
  const { mutateAsync: readAllNotisMutateAsync } = useReadAllNotificationQuery();
  const { mutateAsync: deleteAllReadNotiMutateAsync } = useDeleteReadAllNotificationMutation();

  const handleClickReadAllNotis = async () => {
    await readAllNotisMutateAsync();
    await refetch();
    unReadCountRefetch();
  };
  const handleClickDeleteAllNotis = async () => {
    await deleteAllReadNotiMutateAsync();
    await refetch();
    unReadCountRefetch();
  };

  return (
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
  );
}
