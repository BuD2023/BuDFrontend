import { throttle } from 'lodash';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import NotiBtn from './NotiBtn';
import MainBtn from '../common/MainBtn';

interface IHeader {
  type: string;
  title: string;
  icon: ReactElement<IconType>;
  onSubmit?: object;
}

export default function Header({ type, title, icon, onSubmit }: IHeader) {
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);
  const navigate = useNavigate();

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;
        if (beforeScrollY.current < currentScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        beforeScrollY.current = currentScrollY;
      }, 250),
    [beforeScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={'fixed top-0 left-0 z-10 flex w-full items-center justify-between bg-lightIvory p-4 py-5 transition-all dark:bg-darkNavy ' + (visible ? '' : 'opacity-0')}>
      <div className="flex items-center gap-3 text-[26px] font-bold">
        {type === 'category' ? (
          <div className="rounded-xl bg-white p-1">{icon}</div>
        ) : (
          <div onClick={() => navigate(-1)} className="cursor-pointer rounded-xl p-1">
            {icon}
          </div>
        )}
        <h1>{title}</h1>
      </div>
      {type === 'community' && <BsThreeDots size={26} />}
      {type === 'category' && <NotiBtn />}
      {type === 'withMainBtn' && <MainBtn onSubmit={onSubmit} content={'완료'} size={20} />}
    </div>
  );
}
