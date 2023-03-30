import { MdManageAccounts } from 'react-icons/md';

export default function Account() {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-[#ffffff50] pb-5 text-[22px] font-semibold">
        <MdManageAccounts size="30" />
        <p>계정 설정</p>
      </div>
      <div className="flex flex-col text-xl">
        <p className="cursor-pointer py-2">회원 정보 조회</p>
        <p className="cursor-pointer py-2">로그아웃</p>
        <p className="cursor-pointer py-2">회원 탈퇴</p>
      </div>
    </div>
  );
}
