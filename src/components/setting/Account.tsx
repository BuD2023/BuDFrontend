import { useState } from 'react';
import { MdManageAccounts } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDeleteAccountMutation } from '../../store/module/useSettingQuery';
import AlertModal from '../common/AlertModal';
import ConfirmModal from '../common/ConfirmModal';

export default function Account() {
  const navigate = useNavigate();

  //리액트 쿼리
  const { mutateAsync } = useDeleteAccountMutation();

  // confirm 모달창
  const [confirmModal, setConfirmModal] = useState(false);
  const getModalAnswer = async () => {
    await mutateAsync();
    navigate('/logIn');
  };
  const withdrawalText = '회원님에 대한 모든 정보가 삭제됩니다.\n이 동작은 되돌릴 수 없습니다.\n정말 탈퇴하시겠습니까?';

  // allert 모달창
  const [alertModal, setAlertModal] = useState(false);
  const logoutAction = () => {
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('accessToken');
    window.localStorage.setItem('logInStatus', 'false');
    navigate('/logIn');
  };

  const logoutAction = () => {
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('accessToken');
    window.localStorage.setItem('logInStatus', 'false');
    navigate('/logIn');
  };

  return (
    <>
      <AlertModal alertModal={alertModal} setAlertModal={setAlertModal} title="로그아웃 알림" des="로그아웃됩니다!" action={logoutAction} />
      <ConfirmModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} getModalAnswer={getModalAnswer} title="회원 탈퇴" des={withdrawalText} confirmBtn="탈퇴하기" />
      <div className="mb-4 flex flex-col gap-4 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
        <div className="flex items-center gap-3 text-[22px] font-semibold dark:border-[#ffffff50]">
          <MdManageAccounts size="30" />
          <p>계정 설정</p>
        </div>
        <div className="flex flex-col text-xl">
          <p onClick={() => navigate('/userInfo')} className="cursor-pointer p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-sky dark:hover:bg-opacity-50">
            회원 정보 조회
          </p>
          <p onClick={() => setAlertModal(true)} className="cursor-pointer p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-sky dark:hover:bg-opacity-50">
            로그아웃
          </p>
          <p onClick={() => setConfirmModal(true)} className="cursor-pointer p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-sky dark:hover:bg-opacity-50">
            회원 탈퇴
          </p>
        </div>
      </div>
    </>
  );
}
