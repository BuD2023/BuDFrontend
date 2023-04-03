interface IMainBtn {
  content: string;
  size: number;
  onSubmit?: object;
}

export default function MainBtn({ content, size, onSubmit }: IMainBtn) {
  const handleSubmitData = () => {
    console.log(onSubmit);
  };

  return (
    <div onClick={handleSubmitData} className={'flex justify-center rounded-[50px] bg-greyBeige dark:bg-sky ' + `text-[${size}px]`}>
      <span className="py-2 px-5 font-bold">{content}</span>
    </div>
  );
}
