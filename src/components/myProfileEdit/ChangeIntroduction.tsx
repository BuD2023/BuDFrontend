import { ChangeIntroductionPropsType } from './_MyProfileEdit.interface';

export default function ChangeIntroduction({ introduction, setIntroduction }: ChangeIntroductionPropsType) {
  return (
    <textarea
      onChange={(e) => setIntroduction(e.target.value)}
      value={introduction}
      placeholder="소개를 입력하세요"
      className="h-[120px] w-full rounded-[20px] bg-midIvory p-4 text-[16px] leading-5 placeholder:font-semibold placeholder:text-[#7b6d6d] focus:outline-none dark:bg-lightNavy"
    />
  );
}
