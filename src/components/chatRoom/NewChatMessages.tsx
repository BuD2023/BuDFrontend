import React from 'react';
import { S3_URL } from '../../constant/union';
import LazyLoadImage from '../../utils/LazyLoadImage';
import { ChatMessageType } from './_ChatRoom.interface';

interface NewChatMessagesPropsType {
  newChatMessages: Partial<ChatMessageType>[];
  myPageInfo: any;
  handleClickUserImg: (userName: string, userProfileUrl: string, userId: number) => void;
  setIsPicPopUp: (x: { open: boolean; pic: string }) => void;
}

export default function NewChatMessages({ newChatMessages, myPageInfo, handleClickUserImg, setIsPicPopUp }: NewChatMessagesPropsType) {
  return (
    <>
      {newChatMessages?.map((chat: Partial<ChatMessageType>) => {
        return chat.userName !== myPageInfo?.nickName ? (
          <div key={chat.chatId} className="mb-3 flex gap-4">
            <LazyLoadImage
              src={S3_URL + chat.userProfileUrl}
              alt={chat.userName as string}
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
                    <LazyLoadImage src={S3_URL + chat?.message} className="max-h-[60vw] max-w-[50vw] object-cover" alt="image" />
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
                  <LazyLoadImage src={S3_URL + chat?.message} className="max-h-[70vw] max-w-[50vw] object-cover" alt="image" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
