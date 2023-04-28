import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfoEditInitialType } from '../../pages/profile/MyProfileEdit';
import { useCreateUserInfoMutation } from '../../store/module/useMyProfileQuery';
import { useNotificationTokenMutation } from '../../store/module/useNotificationQuery';
import { addUserInfo } from '../../store/recoil/addUserInfo';
import { getFcmToken } from '../../utils/fcm';
import { toFormDataOnUserInfo } from '../../utils/toFormData';
import CheckBoxModal from '../common/CheckBoxModal';
import ChangeJob from '../myProfileEdit/ChangeJob';
import { SetNotificationType } from './_SignUp.interface';

export default function SetJob() {
  // const [selectedJob, setSelectedJob] = useState('');
  const navigate = useNavigate();
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<SetNotificationType>({ post: true, follow: true });

  const getNotificationToken = async () => {
    try {
      const fcmToken = await getFcmToken();
      return fcmToken;
    } catch (error) {
      console.log(error);
    }
  };

  // 리코일
  const [userInfo, setUserInfo] = useRecoilState(addUserInfo);

  // 리액트 쿼리
  const { mutateAsync: notiTokenMutate } = useNotificationTokenMutation();
  const { mutateAsync: createUserMutate } = useCreateUserInfoMutation();

  const getModalAnswer = (obj: SetNotificationType) => {
    setNotification(obj);
  };

  const onClickHandler = async () => {
    setCheckModal(true);
    console.log(userInfo);
  };

  const action = async () => {
    const userResult = toFormDataOnUserInfo(userInfo);
    try {
      const fcmToken = await getNotificationToken();
      await notiTokenMutate({ fcmToken: fcmToken as string, isFollowPushAvailable: notification.follow, isPostPushAvailable: notification.post });
      await createUserMutate(userResult);
      navigate('/');
    } catch (err) {
      console.log(err);
      alert(err);
      navigate('/signUp');
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
          <ChangeJob selectedJob={userInfo} setSelectedJob={setUserInfo as (x: UserInfoEditInitialType) => void} />
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/signUp/picture')}
              type="button"
              className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white  hover:dark:border-white"
            >
              이전
            </button>
            <button
              onClick={onClickHandler}
              disabled={!(userInfo.job.length > 0)}
              type="button"
              className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white disabled:opacity-0  hover:dark:border-white"
            >
              완료
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
