interface IMainBtn {
  content: string;
  size: number;
  onSubmit?: object;
}

export default function MainBtn({ onSubmit, content, size }: IMainBtn) {
  const handleSubitData = () => {
    console.log(onSubmit);
  };
  return (
    <div onClick={handleSubitData} className={'flex cursor-pointer justify-center rounded-[50px] bg-greyBeige dark:bg-sky ' + `text-[${size}px]`}>
      <span className="py-2 px-5 font-bold">{content}</span>
    </div>
  );
}
