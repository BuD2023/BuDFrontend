import { useState } from 'react';
import { MdManageAccounts } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../common/ConfirmModal';

export default function Account() {
  const [confirmModal, setConfirmModal] = useState(false);
  const getModalAnswer = () => {};
  const withdrawalText = '회원님에 대한 모든 정보가 삭제됩니다.\n이 동작은 되돌릴 수 없습니다.\n정말 탈퇴하시겠습니까?';
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-[#ffffff50] pb-5 text-[22px] font-semibold">
        <MdManageAccounts size="30" />
        <p>계정 설정</p>
      </div>
      <div className="flex flex-col text-xl">
        <p className="cursor-pointer py-2">회원 정보 조회</p>
        <p onClick={() => navigate('/userInfo')} className="cursor-pointer py-2">
          로그아웃
        </p>
        <p onClick={() => setConfirmModal(true)} className="cursor-pointer py-2">
          회원 탈퇴
        </p>
      </div>
      <ConfirmModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} getModalAnswer={getModalAnswer} title="회원 탈퇴" des={withdrawalText} confirmBtn="탈퇴하기" />
    </div>
  );
}
