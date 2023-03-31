interface IToggle {
  isOn: boolean;
}

export default function Toggle({ isOn }: IToggle) {
  return (
    <div className="relative cursor-pointer">
      <div className={'h-[24px] w-[50px] rounded-full bg-[#d9d9d9] ' + (isOn ? '!bg-pointGreen transition-all' : '')}></div>
      <div className={'absolute top-[1px] left-[1px] h-[22px] w-[22px] rounded-full bg-white transition-all ' + (isOn ? 'left-[27px] transition-all' : '')}></div>
    </div>
  );
}
