import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BASE_URL } from '../../constant/union';
import { useNotificationTokenMutation } from '../../store/module/useNotificationQuery';
import { useLogInCheckQuery } from '../../store/module/useSettingQuery';
import { loginUserInfo } from '../../store/recoil/user';
import { getFcmToken } from '../../utils/fcm';
import { getAccessToken } from '../../utils/getAccessToken';

export default function LogInLoadingPage() {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const userInfo = useRecoilValue(loginUserInfo);

  //리액트 쿼리
  const { mutateAsync: postFcmTokenMutation } = useNotificationTokenMutation();
  const { data, refetch, isRefetching, isFetched, isError } = useLogInCheckQuery();

  //useState
  const [fcmToken, setFcmToken] = useState<string>('');

  //fcm토큰 발급
  useEffect(() => {
    const getToken = async () => {
      const token = await getFcmToken();
      setFcmToken(token as string);
    };
    getToken();
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    (async () => {
      let userToken;
      if (codeParams && localStorage.getItem('accessToken') === null) {
        userToken = await getAccessToken(codeParams, setRerender, rerender);
        console.log(userToken);
      } else {
        const token = localStorage.getItem('accessToken');
        console.log(JSON.parse(token as string));
      }
      await useLogInCheckQuery(userToken as string).refetch();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isFetched) {
        console.log('fetched');
        if (data?.isAddInfo && data?.isAddInfo === true) {
          await postFcmTokenMutation({
            fcmToken: fcmToken as string,
          });
          navigate('/');
        } else navigate('/signUp');
      }
    })();
  }, [isRefetching]);

  // useEffect(() => {
  //   (async () => {
  //     if (userInfo) {

  //     }
  //   })();
  // }, [userInfo]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     data?.isAddInfo && data.isAddInfo === true ? navigate('/') : navigate('/signUp');
  //   }
  // }, [isRefetching]);

  if (useLogInCheckQuery().isError) console.log('error');

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
