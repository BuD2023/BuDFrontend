import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { addUserInfo } from '../../store/recoil/addUserInfo';

export default function SignUp() {
  const [userInfo, setUserInfo] = useRecoilState(addUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(window.location.href, { method: 'GET' })
      .then((response) => {
        console.log(response.headers);
        const refreshToken = response.headers.get('Authorization');
        if (refreshToken) {
          console.log(refreshToken);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section>
      <motion.div initial={{ opacity: 0, y: '7%' }} animate={{ opacity: 1, y: '0' }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col items-center gap-8 p-4 text-xl font-bold">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-[26px]">마리포에서 사용할</h1>
            <h1 className="text-[26px]">닉네임을 알려주세요!</h1>
          </div>
          <input
            onChange={(e) => setUserInfo({ ...userInfo, nickname: e.target.value })}
            type="text"
            value={userInfo.nickname}
            className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 focus:outline-none dark:bg-lightNavy"
          />
          <button
            type="button"
            onClick={() => {
              navigate('picture');
              console.log(userInfo);
            }}
            disabled={!(userInfo.nickname.length > 0)}
            className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white disabled:opacity-0  hover:dark:border-white"
          >
            다음
          </button>
        </div>
      </motion.div>
    </section>
  );
}
