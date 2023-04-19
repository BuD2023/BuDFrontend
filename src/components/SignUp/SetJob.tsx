import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationTokenMutation } from '../../store/module/useNotificationQuery';
import sendFCMTokenFunc, { requestPermission } from '../../utils/fcm';
import CheckBoxModal from '../common/CheckBoxModal';
import ChangeJob from '../myProfileEdit/ChangeJob';

export interface SetNotificationType {
  post: boolean;
  follow: boolean;
}

export default function SetJob() {
  const [selectedJob, setSelectedJob] = useState('');
  const navigate = useNavigate();
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<SetNotificationType>({ post: true, follow: true });

  const getNotificationToken = async () => {
    try {
      requestPermission();
      const fcmToken = await sendFCMTokenFunc();
      return fcmToken;
    } catch (error) {
      console.log(error);
    }
  };

  // 리액트 쿼리
  const { mutate } = useNotificationTokenMutation();

  const getModalAnswer = (obj: SetNotificationType) => {
    setNotification(obj);
  };

  const onClickHandler = async () => {
    setCheckModal(true);
  };

  const action = async () => {
    try {
      const fcmToken = await getNotificationToken();
      mutate({ fcmToken: fcmToken as string, isFollowPushAvailable: notification.follow, isPostPushAvailable: notification.post });
      navigate('/');
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  };

  return (
    <>
      <CheckBoxModal checkModal={checkModal} setCheckModal={setCheckModal} getModalAnswer={getModalAnswer} action={action} />
      <motion.div initial={{ opacity: 0, y: '5%' }} animate={{ opacity: 1, y: '0' }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col items-center gap-8 p-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-[26px] font-bold">관심있는 직무를</h1>
            <h1 className="text-[26px] font-bold">선택해주세요!</h1>
          </div>
          <ChangeJob selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/signUp/picture')}
              type="button"
              className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white dark:border-[#7cb342] dark:bg-[#7cb342] hover:dark:border-white"
            >
              이전
            </button>
            <button
              onClick={onClickHandler}
              disabled={!(selectedJob.length > 0)}
              type="button"
              className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white disabled:opacity-0 dark:border-[#7cb342] dark:bg-[#7cb342] hover:dark:border-white"
            >
              완료
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
