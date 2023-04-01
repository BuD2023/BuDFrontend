import React from 'react';

interface IChangeNickNamePropsType {
  nickName: string;
  setNickName: (x: string) => void;
}

export default function ChangeNickName({ nickName, setNickName }: IChangeNickNamePropsType) {
  return (
    <div className="mb-4 flex flex-col gap-4 text-xl font-bold">
      <p className="font-bold">닉네임</p>
      <input onChange={(e) => setNickName(e.target.value)} type="text" value={nickName} className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 focus:outline-none dark:bg-lightNavy" />
    </div>
  );
}
