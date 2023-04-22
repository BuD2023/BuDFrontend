import { RefObject, useEffect, useRef, useState } from 'react';
import PicModal from '../common/PicModal';
import UserModal from '../common/UserModal';
import defaultImage from '../../assets/DefaultProfileImage.webp';
import { useInView } from 'react-intersection-observer';
import { S3_URL } from '../../constant/union';
import ScrollToBottomBtn from '../common/ScrollToBottomBtn';
import { ChatMessageType, RoomChatsPropsType } from './_ChatRoom.interface';
import { accessToken } from '../../main';
import { githubUserInfoAtom } from '../../store/recoil/userAtomFamily';
import { useRecoilValue } from 'recoil';

export default function RoomChats({ hostInfo, messageList, newChatMessages, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }: RoomChatsPropsType) {
  // 리코일
  const githubUser = useRecoilValue(githubUserInfoAtom(accessToken));

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
  const handleClickUserImg = (userName: string, userProfileUrl: string, userId: number) => {
    setUserModal(true);
    setUserInfo({
      userId: userId,
      nickName: userName,
      profileUrl: userProfileUrl,
      userIntro: '일단 예시로 둔 소개입니다 ^^.',
      job: '프론트엔드',
    });
  };
  const [userInfo, setUserInfo] = useState({
    userId: 0,
    nickName: '',
    profileUrl: '',
    userIntro: '',
    job: '',
  });

  //scrollToBottom
  const scrollRef = useRef(null);

  return (
    <>
      <UserModal userModal={userModal} setUserModal={setUserModal} userInfo={userInfo} hostInfo={hostInfo} />
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <div ref={scrollRef} className="fixed top-20 left-0 z-10 flex h-[calc(100vh-145px)] w-full flex-col-reverse overflow-auto p-4">
        <ScrollToBottomBtn scrollToNew={scrollRef as RefObject<HTMLDivElement>} />
        <div ref={scrollToNew} className="w-full"></div>
        <>
          {newChatMessages &&
            (newChatMessages as Partial<ChatMessageType>[])
              .filter((i: Partial<ChatMessageType>) => i.chatType === 'MESSAGE' || i.chatType === 'IMAGE')
              .reverse()
              .map((chat: Partial<ChatMessageType>) => {
                return chat.userName !== githubUser?.nickName ? (
                  <div key={chat.chatId} className="mb-3 flex gap-4">
                    <img
                      src={chat.userProfileUrl ? S3_URL + chat.userProfileUrl : defaultImage}
                      alt={chat.userName}
                      className="h-[50px] w-[50px] cursor-pointer rounded-full object-cover"
                      onClick={() => handleClickUserImg(chat.userName as string, chat.userProfileUrl as string, chat.userId as number)}
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
                            <img src={S3_URL + chat?.message} className="max-h-[60vw] max-w-[50vw] object-cover" />
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
        <>
          {messageList &&
            messageList.map((chat) => {
              return chat.userName !== githubUser?.nickName ? (
                <div key={chat.chatId} className="mb-3 flex gap-4">
                  <img
                    src={chat.userProfileUrl ? S3_URL + chat.userProfileUrl : defaultImage}
                    alt={chat.userName}
                    className="h-[50px] w-[50px] cursor-pointer rounded-full object-cover"
                    onClick={() => handleClickUserImg(chat.userName as string, chat.userProfileUrl as string, chat.userId as number)}
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
                          <img src={S3_URL + chat?.message} className="max-h-[60vw] max-w-[50vw] object-cover" />
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
        <div ref={observerRef}></div>
      </div>
    </>
  );
}
