interface IOnSubmitType {
  title: string;
  des: string;
  tag: string[];
  profileImg: string | ArrayBuffer | null;
  nickName: string;
  selectedJob: string;
}

interface IMainBtn {
  content: string;
  size: number;
  onSubmit?: Partial<IOnSubmitType>;
}

export default function MainBtn({ onSubmit, content, size }: IMainBtn) {
  const handleSubitData = () => {
    console.log(onSubmit);
  };

  return (
    <button
      disabled={(onSubmit?.title?.trim().length === 0 || onSubmit?.des?.trim().length === 0) as boolean}
      onClick={handleSubitData}
      className={'flex cursor-pointer justify-center rounded-[50px] bg-greyBeige disabled:opacity-40 dark:bg-sky ' + `text-[${size}px]`}
    >
      <span className="py-2 px-5 font-bold">{content}</span>
    </button>
  );
}
