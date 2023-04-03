import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationDummy } from '../../store/notificationDummy';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { BsFillTrashFill } from 'react-icons/bs';

interface INotiContent {
  [key: string]: (senderId: string) => JSX.Element;
}

export default function NotificationContent() {
  const navigate = useNavigate();

  const handleNotiClick = (page: string, pageDetail: string) => {
    if (page === 'otherProfile') {
      navigate(`/otherProfile/${pageDetail}`);
    } else if (page === 'feed') {
      navigate(`/communityFeedDetail/${pageDetail}`);
    } else {
      navigate(`/communityQADetail/${pageDetail}`);
    }
  };

  const handleImgClick = (senderId: string, event: any) => {
    navigate(`/otherProfile/${senderId}`);
    event.stopPropagation();
  };

  const notiContent: INotiContent = {
    followed: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님을 팔로우했습니다.
      </p>
    ),
    newPost: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 새로운 글을 작성했습니다.
      </p>
    ),
    comment: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 댓글을 작성했습니다.
      </p>
    ),
    like: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 좋아요를 눌렀습니다.
      </p>
    ),
    answer: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 답변을 작성했습니다.
      </p>
    ),
    pin: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 댓글을 핀했습니다.
      </p>
    ),
  };

  const handleContent = (notiType: string, senderId: string): JSX.Element | null => {
    const contentFn = notiContent[notiType];
    return contentFn ? contentFn(senderId) : null;
  };

  return (
    <SwipeableList>
      {() => (
        <div className={'mt-9 flex h-full flex-col gap-7 p-4 px-2 text-lightText dark:text-white'}>
          {notificationDummy.map((noti) => {
            return (
              <SwipeableListItem
                key={noti.notificationId}
                swipeLeft={{
                  content: (
                    <div className="flex h-full w-full items-center justify-end bg-[#ff5232] p-4 text-white dark:bg-[#a51b0b]">
                      <span className="flex items-center gap-2 text-lg">
                        삭제
                        <BsFillTrashFill />
                      </span>
                    </div>
                  ),
                  action: () => console.log('Deleting item:', noti.notificationId),
                }}
              >
                <li onClick={() => handleNotiClick(noti.page, noti.pageDetail)} key={noti.notificationId} className="flex cursor-pointer items-center gap-3">
                  <img
                    onClick={(event: React.MouseEvent<HTMLImageElement>) => handleImgClick(noti.senderId, event)}
                    src="https://picsum.photos/105/105"
                    alt={noti.senderId}
                    className="h-[65px] w-[65px] rounded-full"
                  />
                  <div className="flex flex-col gap-0.5 text-lg">
                    {handleContent(noti.alertType, noti.senderId)}
                    <p className="text-sm opacity-50">1m ago + 알림DB에 시간도 필요!</p>
                  </div>
                </li>
              </SwipeableListItem>
            );
          })}
        </div>
      )}
    </SwipeableList>
  );
}
