import React from 'react';
import { useRecoilValue } from 'recoil';
import { S3_URL } from '../../constant/union';
import { loginUserInfo } from '../../store/recoil/user';
import LazyLoadImage from '../../utils/LazyLoadImage';
import { myChatroomListContentType } from './_ChatRoom.interface';

interface MessageListPropsType {
  messageList: myChatroomListContentType[];
  handleClickUserImg: (userName: string, userProfileUrl: string, userId: number) => void;
  setIsPicPopUp: (x: { open: boolean; pic: string }) => void;
}

export default function MessageList({ messageList, handleClickUserImg, setIsPicPopUp }: MessageListPropsType) {
  const logInUserInfo = useRecoilValue(loginUserInfo);

  return (
    <>
      {messageList?.map((chat) => {
        return chat.userId !== logInUserInfo?.id ? (
          <div key={chat.chatId} className="mb-3 flex gap-4">
            <LazyLoadImage
              src={S3_URL + chat.userProfileUrl}
              alt={chat.userName}
              className="h-[50px] w-[50px] cursor-pointer rounded-full object-cover"
              onClick={() => {
                handleClickUserImg(chat.userName as string, chat.userProfileUrl as string, chat.userId as number);
              }}
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
                    <LazyLoadImage src={S3_URL + chat?.message} className="max-h-[60vw] max-w-[50vw] object-cover" alt={'image'} />
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
                  <LazyLoadImage src={S3_URL + chat?.message} className="max-h-[70vw] max-w-[50vw] object-cover" alt={'image'} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
