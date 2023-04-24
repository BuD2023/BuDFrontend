import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { AddBtnPropsType } from './_Common.interface';

export default function AddBtn({ url, text }: AddBtnPropsType) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(url)}
      className="fixed bottom-[120px] z-20 flex h-[50px] w-[28vw] min-w-[120px] max-w-[180px] cursor-pointer items-center justify-center gap-1 rounded-full border-[2px] border-pointGreen bg-pointGreen text-[24px] text-white drop-shadow-2xl transition-all hover:border-white hover:dark:border-white"
    >
      <IoMdAdd />
      <span className="mb-0.5 mr-0.5 text-[18px] font-semibold">{text}</span>
    </div>
  );
}
