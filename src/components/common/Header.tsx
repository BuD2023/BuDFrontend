import { ReactElement } from 'react';
import { IconType } from 'react-icons/lib';
import NotiBtn from './NotiBtn';

interface IHeader {
  title: string;
  icon: ReactElement<IconType>;
}

export default function Header({ title, icon }: IHeader) {
  return (
    <div className="mb-4 flex h-[26px] w-full items-center justify-between text-[26px] font-bold">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white p-1">{icon}</div>
        <h1>{title}</h1>
      </div>
      <NotiBtn />
    </div>
  );
}
