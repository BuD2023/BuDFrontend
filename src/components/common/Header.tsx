import { throttle } from 'lodash';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { useLocation, useNavigate } from 'react-router-dom';
import NotiBtn from './NotiBtn';
import MainBtn from '../common/MainBtn';
import { AiFillCopy } from 'react-icons/ai';
import { MdOutlineRestartAlt } from 'react-icons/md';
import EditDeleteBtn from './EditDeleteBtn';
import { useGithubMutation } from '../../store/module/useGithubQuery';
import ConfirmModal from './ConfirmModal';

interface IHeader {
  type?: string;
  title?: string;
  restart?: boolean;
  icon?: ReactElement<IconType>;
  onSubmit?: object;
  postId?: string;
  copyUrl?: string;
}

export default function Header({ type, title, restart, icon, onSubmit, postId, copyUrl }: IHeader) {
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);
  const navigate = useNavigate();
  const url = useLocation();

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

  const { mutate: postGithub } = useGithubMutation();

  const [confirmModal, setConfirmModal] = useState(false);
  const getModalAnswer = () => {};
  const withdrawalText = '작성한 내용이 저장되지 않습니다.\n정말 페이지를 이동하시겠습니까?';
  const action = () => {
    navigate(-1);
  };

  return (
    <div className={'fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-lightIvory p-4 py-5 transition-all dark:bg-darkNavy ' + (visible ? '' : 'opacity-0')}>
      <div className="flex items-center gap-3 text-[26px] font-bold">
        {type === 'category' ? (
          <div className="rounded-xl bg-white p-1">{icon}</div>
        ) : (
          <div onClick={() => (url.pathname.includes('Detail') ? navigate(-1) : setConfirmModal(true))} className="cursor-pointer rounded-xl p-1">
            {icon}
          </div>
        )}
        <div className="flex gap-2">
          <h1>{title}</h1>
          {restart && <MdOutlineRestartAlt onClick={() => postGithub()} className="cursor-pointer" />}
        </div>
      </div>
      {type === 'category' && <NotiBtn />}
      {type === 'news' && <AiFillCopy size={26} className="cursor-pointer" onClick={() => navigator.clipboard.writeText((copyUrl ??= ''))} />}
      {type === 'community' && <BsThreeDots size={26} onClick={() => setIsMenu(!isMenu)} className="cursor-pointer" />}
      {isMenu && <EditDeleteBtn postId={String(postId)} setIsMenu={setIsMenu} />}
      {type === 'withMainBtn' && <MainBtn onSubmit={onSubmit} content={'완료'} size={20} />}
      {type === 'withMainBtn' && (
        <ConfirmModal action={action} confirmModal={confirmModal} setConfirmModal={setConfirmModal} getModalAnswer={getModalAnswer} title="" des={withdrawalText} confirmBtn="뒤로가기" />
      )}
    </div>
  );
}
