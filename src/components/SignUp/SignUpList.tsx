import { ChangeEvent, useRef, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChangeNickName from '../myProfileEdit/ChangeNickName';
import ChangeJob from '../myProfileEdit/ChangeJob';
import ChangeProfilePic from '../myProfileEdit/ChangeProfilePic';

export function Nickname() {
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: '7%' }} animate={{ opacity: 1, y: '0' }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col items-center gap-8 p-4 text-xl font-bold">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[26px]">마리포에서 사용할</h1>
          <h1 className="text-[26px]">닉네임을 알려주세요!</h1>
        </div>
        <ChangeNickName nickName={nickName} setNickName={setNickName} />
        <button
          type="button"
          onClick={() => navigate('picture')}
          disabled={!(nickName.length > 0)}
          className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white disabled:opacity-0 dark:border-[#7cb342] dark:bg-[#7cb342] hover:dark:border-white"
        >
          다음
        </button>
      </div>
    </motion.div>
  );
}

export function Picture() {
  const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(defaultImg);
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleProfileImgClick = () => {
    imgRef?.current?.click();
  };

  const handleChangeProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImg(reader.result);
      };
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: '5%' }} animate={{ opacity: 1, y: '0' }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col items-center gap-8 p-4">
        <div className="mb-4 flex flex-col items-center gap-2">
          <h1 className="text-[26px] font-bold">마리포에서 사용할</h1>
          <h1 className="text-[26px] font-bold">사진을 선택해주세요!</h1>
        </div>
        <ChangeProfilePic profileImg={profileImg} handleChangeProfileImg={handleChangeProfileImg} setProfileImg={setProfileImg} />
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/signUp')}
            type="button"
            className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white dark:border-[#7cb342] dark:bg-[#7cb342] hover:dark:border-white"
          >
            이전
          </button>
          <button
            onClick={() => navigate('/signUp/job')}
            type="button"
            className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white dark:border-[#7cb342] dark:bg-[#7cb342] hover:dark:border-white"
          >
            다음
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Job() {
  const [selectedJob, setSelectedJob] = useState('');
  const navigate = useNavigate();

  return (
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
            disabled={!(selectedJob.length > 0)}
            type="button"
            className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white disabled:opacity-0 dark:border-[#7cb342] dark:bg-[#7cb342] hover:dark:border-white"
          >
            완료
          </button>
        </div>
      </div>
    </motion.div>
  );
}
