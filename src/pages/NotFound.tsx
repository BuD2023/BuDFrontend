import { useNavigate } from 'react-router-dom';
import notFound from '../assets/notFound.jpg';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="relative inset-0 flex h-screen flex-col gap-4 p-4 text-lightText dark:text-white">
        <div className="flex h-full flex-col items-center justify-center gap-6 text-[15px]">
          <img src={notFound} className="mb-4 h-[70vw] max-h-[350px] w-[70vw] max-w-[350px] rounded-full" />
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-[26px] font-bold">Oops!?</h3>
            <h4 className="text-[24px] font-bold">찾을 수 없는 페이지입니다.</h4>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p>찾으려는 페이지의 주소가 잘못 입력되었거나,</p>
            <p>주소의 변경 혹은 삭제로 사용하실 수 없습니다.</p>
            <p>입력하신 페이지의 주소를 확인해 주세요.</p>
          </div>
          <button onClick={() => navigate('/')} className="mt-6 w-[50%] max-w-[280px] cursor-pointer rounded-xl bg-[#5C7677] py-4 text-[16px] font-semibold text-white">
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </section>
  );
}
