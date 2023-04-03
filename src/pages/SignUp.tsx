import { ChangeEvent, useRef, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChangeNickName from '../components/myProfileEdit/ChangeNickName';

export default function SignUp() {
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
