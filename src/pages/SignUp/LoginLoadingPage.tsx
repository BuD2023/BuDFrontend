import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BASE_URL } from '../../constant/union';

export default function LogInLoadingPage() {
  // const [rerender, setRerender] = useState(false);

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const codeParams = urlParams.get('code');
  //   console.log(codeParams);
  //   if (codeParams && localStorage.getItem('accessToken') === null) {
  //     const getAccessToken = async () => {
  //       try {
  //         const response = await axios.get(BASE_URL + 'token', {
  //           params: {
  //             code: codeParams,
  //           },
  //         });
  //         const data = response.headers;
  //         const result = {
  //           token: data.authorization as string,
  //           userName: data.jwt_user_information as string,
  //         };
  //         console.log(result);
  //         if (data.authorization) {
  //           localStorage.setItem('accessToken', JSON.stringify(result));
  //           setRerender(!rerender);
  //         }
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     };
  //     getAccessToken();
  //   } else {
  //     const token = localStorage.getItem('accessToken');
  //     console.log(token);
  //   }
  // }, []);

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
