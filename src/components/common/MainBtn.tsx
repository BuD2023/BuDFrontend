interface IMainBtn {
  content: string;
  size: number;
}

export default function MainBtn({ content, size }: IMainBtn) {
  return (
    <div className={'bg- flex justify-center rounded-[50px] bg-midIvory dark:bg-sky ' + `text-[${size}px]`}>
      <span className="py-2 px-5 font-bold">{content}</span>
    </div>
  );
}
