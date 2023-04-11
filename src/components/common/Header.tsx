import { throttle } from 'lodash';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import NotiBtn from './NotiBtn';
import MainBtn from '../common/MainBtn';
import { AiFillCopy } from 'react-icons/ai';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { accessToken } from '../../main';
import axios from 'axios';
import EditDeleteBtn from './EditDeleteBtn';

interface IHeader {
  type?: string;
  title?: string;
  restart?: boolean;
  icon?: ReactElement<IconType>;
  onSubmit?: object;
  postId?: string;
}

export default function Header({ type, title, restart, icon, onSubmit, postId }: IHeader) {
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);
  const navigate = useNavigate();

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;

        if (beforeScrollY.current < currentScrollY && currentScrollY > 50) {
          setVisible(false);
          setIsMenu(false);
        } else {
          setVisible(true);
          setIsMenu(false);
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

  const [isMenu, setIsMenu] = useState<boolean>();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'content-type': 'application/json',
    withCredentials: true,
  };

  const postGitHub = async () => {
    try {
      const response = await axios.post('/api/home/github', { headers: headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={'fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-lightIvory p-4 py-5 transition-all dark:bg-darkNavy ' + (visible ? '' : 'opacity-0')}>
      <div className="flex items-center gap-3 text-[26px] font-bold">
        {type === 'category' ? (
          <div className="rounded-xl bg-white p-1">{icon}</div>
        ) : (
          <div onClick={() => navigate(-1)} className="cursor-pointer rounded-xl p-1">
            {icon}
          </div>
        )}
        <div className="flex gap-2">
          <h1>{title}</h1>
          {restart && <MdOutlineRestartAlt onClick={postGitHub} className="cursor-pointer" />}
        </div>
      </div>
      {type === 'category' && <NotiBtn />}
      {type === 'news' && <AiFillCopy size={26} />}
      {type === 'community' && <BsThreeDots size={26} onClick={() => setIsMenu(!isMenu)} className="cursor-pointer" />}
      {isMenu && <EditDeleteBtn postId={String(postId)} />}
      {type === 'withMainBtn' && <MainBtn onSubmit={onSubmit} content={'완료'} size={20} />}
    </div>
  );
}
