import { AiFillGithub } from 'react-icons/ai';

export default function LogIn() {
  function loginWithGithub() {
    window.location.assign('http://34.64.224.24:8080/oauth2/authorization/github ');
  }

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center bg-lightIvory dark:bg-darkNavy">
      <div className="text-[150px] font-bold underline">🌲</div>
      <div className="mt-8 text-[30px] font-bold text-lightText dark:text-white">
        <span className="text-pointGreen">{`< `}</span>
        <span>My Little Forest</span>
        <span className="text-pointGreen">{` />`}</span>
      </div>
      <div className="mb-20 mt-12 text-center text-[20px] font-bold text-lightText dark:text-white">
        <div className="">마이 리틀 포레스트에 오신 것을 환영해요</div>
        <div className="mt-4">깃허브를 통해 로그인해주세요</div>
      </div>
      <button
        onClick={loginWithGithub}
        className="shadow-indigo-500/40 absolute bottom-16 flex h-14 w-[90%] cursor-pointer items-center justify-center rounded-full bg-midIvory text-[18px] font-bold text-lightText shadow-sm transition-all dark:bg-lightNavy dark:text-white"
      >
        <AiFillGithub />
        <span className="mx-1">깃허브로 로그인하기</span>
      </button>
    </section>
  );
}
