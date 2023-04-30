import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import postNotificationTokenAxios from '../../apiFetcher/notificationInfo/postNotificationToken';
import getLogInCheckAxios from '../../apiFetcher/setting/getLogInCheck';
import { useLogInCheckQuery } from '../../store/module/useSettingQuery';
import { loginUserInfo } from '../../store/recoil/user';
import { getFcmToken } from '../../utils/fcm';
import { getAccessToken } from '../../utils/getAccessToken';

export default function LogInLoadingPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(loginUserInfo);

  //리액트 쿼리
  const { refetch, isError } = useLogInCheckQuery();

  //useState
  const [fcmToken, setFcmToken] = useState<string>('');

  // 토큰 발급
  const getToken = async () => {
    const token = await getFcmToken();
    setFcmToken(token as string);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    (async () => {
      await getToken();
      if (codeParams && !localStorage.getItem('accessToken')) {
        const userToken = await getAccessToken(codeParams);
        if (userToken) {
          const isCheckResponse = await getLogInCheckAxios(userToken.token as string);
          setUserInfo(userToken);
          await postNotificationTokenAxios(userToken.token, {
            fcmToken: fcmToken as string,
          });
          if (isCheckResponse?.isAddInfo && isCheckResponse?.isAddInfo === true) {
            navigate('/');
          } else navigate('/signUp');
        }
      } else {
        console.log(userInfo);
        await refetch();
        navigate('/');
      }
    })();
  }, []);

  if (isError) console.log('error');

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center bg-lightIvory dark:bg-darkNavy">
      <div className="loadingTree animate-flip relative transform transition-transform duration-500">
        <img src="../../public/loadingTree.png" alt="loadingTree" />
      </div>
      <div className="mt-8 text-[30px] font-bold text-lightText dark:text-white">
        <span className="text-pointGreen">{`< `}</span>
        <span>My Little Forest</span>
        <span className="text-pointGreen">{` />`}</span>
      </div>
      <div className="mb-20 mt-12 text-center text-[20px] font-bold text-lightText dark:text-white">
        <div className="">마이 리틀 포레스트에 오신 것을 환영해요</div>
        <div className="mt-4">깃허브를 통해 로그인 중이에요</div>
      </div>
      <div className="shadow-indigo-500/40 absolute bottom-16 flex h-14 w-[90%] items-center justify-center rounded-full bg-midIvory text-[18px] font-bold text-lightText shadow-sm transition-all dark:bg-lightNavy dark:text-white">
        <AiFillGithub />
        <span className="mx-1">깃허브로 로그인 중...</span>
      </div>
    </section>
  );
}
