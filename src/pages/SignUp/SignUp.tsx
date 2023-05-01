import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { addUserInfo } from '../../store/recoil/addUserInfo';
import { debounce } from 'lodash';
import { useGetIsIdUniqueQuery } from '../../store/module/useMyProfileQuery';
import { UserInfoEditInitialType } from '../profile/MyProfileEdit';

export default function SignUp() {
  const navigate = useNavigate();

  //Recoil
  const [userInfo, setUserInfo] = useRecoilState<UserInfoEditInitialType>(addUserInfo);

  //useState
  const [validate, setValidate] = useState<boolean>(false);

  //react query
  const { data: isUniqueId, refetch: isUniqueRefetch } = useGetIsIdUniqueQuery(userInfo.nickname);

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
            <h1 className="text-[26px]">{'사용하실 닉네임을'}</h1>
            <h1 className="text-[26px]">{'설정해주세요'}</h1>
          </div>
          <input
            onChange={debounce(async (e) => {
              setUserInfo({ ...userInfo, nickname: e.target.value });
              await isUniqueRefetch();
            }, 300)}
            onFocus={() => setValidate(true)}
            type="text"
            placeholder="닉네임"
            className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 focus:outline-none dark:bg-lightNavy"
          />
          {isUniqueId ? (
            <>{validate && userInfo.nickname && (userInfo?.nickname as string).length > 0 && <div className="mt-[-10px] ml-4 text-[16px] font-medium text-pointGreen">사용 가능한 닉네임입니다</div>}</>
          ) : (
            <>
              {validate && userInfo.nickname && (userInfo?.nickname as string).length > 0 && (
                <div className="mt-[-10px] ml-4 text-[16px] font-medium text-[#dc2214]">{'이미 사용중인 유저가 있습니다'}</div>
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => {
              navigate('picture');
              console.log(userInfo);
            }}
            disabled={userInfo.nickname.length === 0 || isUniqueId === false}
            className="rounded-full border-[2px] border-pointGreen bg-pointGreen py-2 px-5 text-lg text-white drop-shadow-2xl transition-all hover:border-white disabled:opacity-0  hover:dark:border-white"
          >
            다음
          </button>
        </div>
      </motion.div>
    </section>
  );
}
