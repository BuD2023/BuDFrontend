import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeJob from '../myProfileEdit/ChangeJob';

export default function SetJob() {
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
