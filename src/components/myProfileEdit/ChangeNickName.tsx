import { ChangeNickNamePropsType } from './_MyProfileEdit.interface';

export default function ChangeNickName({ nickName, setNickName }: ChangeNickNamePropsType) {
  return <input onChange={(e) => setNickName(e.target.value)} type="text" value={nickName} className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 focus:outline-none dark:bg-lightNavy" />;
}
