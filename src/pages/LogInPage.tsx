import { AiFillGithub } from 'react-icons/ai';

export default function LogInPage() {
  const CLIENT_ID = 'bec71f378661578c68bd';
  function loginWithGithub() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID);
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-darkNavy">
      <div className="text-[150px] font-bold underline">🌲</div>
      <div className="mt-8 text-[30px] font-bold text-white">
        <span className="text-[#32FFB5]">{`< `}</span>
        <span>My Little Forest</span>
        <span className="text-[#32FFB5]">{` />`}</span>
      </div>
      <div className="mt-12 mb-20 text-center text-[20px] font-bold text-white">
        <div className="">마이 리틀 포레스트에 오신 것을 환영해요</div>
        <div className="mt-4">깃허브를 통해 로그인해주세요</div>
      </div>
      <button
        onClick={loginWithGithub}
        className="absolute bottom-16 flex h-14 w-[90%] cursor-pointer items-center justify-center border-[2px] border-[#BEBDBD] bg-[#BEBDBD] bg-opacity-0 text-[18px] font-bold text-white transition-all hover:border-[#BEBDBD] hover:bg-opacity-100"
      >
        <AiFillGithub className="mx-1 mb-1" />
        <span className="mx-1">깃허브로 로그인하기</span>
      </button>
    </div>
  );
}
