import { useEffect, useRef, useState } from 'react';
import { myChatroomListContentType } from '../../apiFetcher/coffeeChatInfo/getMyChatroomList';
import { IChatsType } from '../../store/chatsDummy';
import { timeForToday } from '../../store/commentDummy';
import PicModal from '../common/PicModal';
import UserListModal from '../common/UserListModal';
import UserModal from '../common/UserModal';
import { useRecoilValue } from 'recoil';
import { user } from '../../store/recoil/user';
import defaultImage from '../../assets/DefaultProfileImage.webp';
import { useGithubQuery } from '../../store/module/useGithubQuery';
import { useInView } from 'react-intersection-observer';
import { S3_URL } from '../../constant/union';
import { MessageType } from '../../pages/ChatRoom';

interface IChatRoomPropsType {
  messageList: myChatroomListContentType[];
  newChatMessages: MessageType[];
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function RoomChats({ messageList, newChatMessages, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }: IChatRoomPropsType) {
  const { data } = useGithubQuery();

  const [userModal, setUserModal] = useState(false);

  // 인피니티 스크롤
  const { ref: observerRef, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  // 사진 popUp
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  // 제일 최신 메세지로 스크롤
  const scrollToNew = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isFetching && isFetchingNextPage) {
      scrollToNew.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  // 백엔드에서 받은 유저 정보에서 받아서 사용할 것들!
  const handleClickUserImg = (e: any) => {
    // console.log(e.target.src, e.target.alt);
    setUserModal(true);
    setUserName(e.target.alt);
    setUserImg(e.target.src);
    setUserIntro('일단 예시로 둔 소개입니다 ^^.');
    setUserJob('프론트엔드');
  };

  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userIntro, setUserIntro] = useState('');
  const [userJob, setUserJob] = useState('');

  return (
    <>
      <UserModal userModal={userModal} setUserModal={setUserModal} userName={userName} userImg={userImg} userIntro={userIntro} userJob={userJob} />
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <div className="fixed top-20 left-0 z-10 flex h-[calc(100vh-145px)] w-full flex-col-reverse overflow-auto p-4">
        <div ref={scrollToNew} className="w-full" />
        <>
          {messageList &&
            messageList.map((chat) => {
              return chat.userName !== data?.nickName ? (
                <div key={chat.chatId} className="mb-3 flex gap-4">
                  <img
                    src={chat.userProfileUrl ? chat.userProfileUrl : defaultImage}
                    alt={chat.userName}
                    className="h-[50px] w-[50px] cursor-pointer rounded-full object-cover"
                    onClick={(e) => handleClickUserImg(e)}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="mt-2 text-base font-semibold">{chat.userName}</p>
                    <div className="flex items-end gap-2">
                      {chat.chatType === 'MESSAGE' ? (
                        <p className="max-w-[55vw] rounded-[10px] bg-white px-3 py-[0.65rem] text-sm text-black">{chat.message}</p>
                      ) : (
                        <div
                          onClick={() => {
                            setIsPicPopUp({
                              open: true,
                              pic: (S3_URL + chat?.message) as string,
                            });
                          }}
                          className="flex cursor-pointer items-center justify-center overflow-hidden rounded-[10px] bg-white px-3 py-[0.65rem]"
                        >
                          <img src={S3_URL + chat?.message} className="max-h-[70vw] max-w-[60vw] object-cover" />
                        </div>
                      )}
                      <div className="text-[14px] opacity-70">{chat.createdAt === '0초 전' ? '방금 전' : chat.createdAt}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={chat.chatId} className="flex flex-col items-end gap-2">
                  <p className="mt-2 text-base font-semibold">{chat.userName}</p>
                  <div className="flex items-end gap-2">
                    <div className="text-[14px] opacity-70">{chat.createdAt === '0초 전' ? '방금 전' : chat.createdAt}</div>
                    {chat.chatType === 'MESSAGE' ? (
                      <p className="min-w-[50px] max-w-[60vw] rounded-[10px] bg-white px-3 py-[0.65rem] text-sm text-black">{chat.message}</p>
                    ) : (
                      <div
                        onClick={() => {
                          setIsPicPopUp({
                            open: true,
                            pic: (S3_URL + chat?.message) as string,
                          });
                        }}
                        className="flex cursor-pointer items-center justify-center rounded-[10px] bg-white px-3 py-[0.65rem]"
                      >
                        <img src={S3_URL + chat?.message} className="max-h-[70vw] max-w-[50vw] object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </>
        <></>
        <div ref={observerRef}></div>
      </div>
    </>
  );
}
