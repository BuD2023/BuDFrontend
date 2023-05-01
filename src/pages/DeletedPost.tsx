import { useNavigate } from 'react-router-dom';
import notFound from '../assets/notFound.jpg';

export default function DeletedPost() {
  const navigate = useNavigate();

  return (
    <section className="relative inset-0 flex flex-col gap-4 p-4 text-lightText dark:text-white">
      <div className="flex h-full flex-col items-center justify-center gap-6 text-[15px]">
        <img src={notFound} alt="notFound" className="mb-4 h-[70vw] max-h-[350px] w-[70vw] max-w-[350px] rounded-full" />
        <div className="flex flex-col items-center justify-center gap-4">
          <h4 className="text-[24px] font-bold">삭제된 게시글입니다.</h4>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p>이미 삭제된 게시글입니다.</p>
          <p>삭제된 게시글의 알림이 사라집니다.</p>
        </div>
        <button onClick={() => navigate('/')} className="mt-6 w-[50%] max-w-[280px] cursor-pointer rounded-xl bg-[#5C7677] py-4 text-[16px] font-semibold text-white">
          메인으로 돌아가기
        </button>
      </div>
    </section>
  );
}
