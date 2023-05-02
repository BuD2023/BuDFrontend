import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNotificationdeleteMutation, useNotificationListQuery, useNotificationStatusMutation } from '../../store/module/useNotificationQuery';
import { notificationDetailType, pageType } from './_Notification.interface';
import { NotiContent } from './_Notification.interface';
import { useInView } from 'react-intersection-observer';
import { timeForToday } from '../../utils/timeForToday';
import { S3_URL } from '../../constant/union';
import { useRecoilState } from 'recoil';
import { deletedNotiId } from '../../store/recoil/deletedNotiId';
import { useCommunityDetailQuery } from '../../store/module/useCommunityDetailQuery';
import axios, { AxiosError } from 'axios';

type ErrorType = {
  error: AxiosError | Error;
};

export default function NotificationContent() {
  const navigate = useNavigate();
  const [deletedNoti, setDeletedNoti] = useRecoilState(deletedNotiId);
  const pageIdRef = useRef(-1);

  //리액트 쿼리
  const { data: notificationData, refetch, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useNotificationListQuery();
  const { mutateAsync: deleteNotiMutateAsync } = useNotificationdeleteMutation();
  const { mutate: changeNotiStatMutation } = useNotificationStatusMutation();
  const { refetch: communityDetailRefetch, isError, data, error } = useCommunityDetailQuery(pageIdRef.current);

  // 인피니티 스크롤
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  const handleNotiClick = async (pageType: pageType, pageId: number, notiId: string) => {
    pageIdRef.current = pageId;
    changeNotiStatMutation(notiId);
    setDeletedNoti(notiId);
    if (pageType === 'OTHER_PROFILE') {
      navigate(`/otherProfile/${pageId}/feed`);
      return;
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (pageIdRef.current !== -1) await communityDetailRefetch();
    }

    fetchData();
  }, [pageIdRef.current]);

  useEffect(() => {
    console.log(deletedNoti);
    if (pageIdRef.current === -1) return;
    if (isError && axios.isAxiosError(error) && error.response) {
      if (error.response.data.message === '존재하지 않는 게시물입니다.') {
        navigate('/DeletedPost');
        deleteNotiMutateAsync(deletedNoti);
        return;
      } else {
        navigate('/NotFound');
        return;
      }
    } else if (data) {
      if (data.postType === 'FEED') {
        navigate(`/communityFeedDetail/${data.id}`);
        return;
      } else {
        navigate(`/communityQADetail/${data.id}`);
        return;
      }
    }
  }, [error, data]);

  const handleImgClick = (senderId: string, event: React.MouseEvent<HTMLImageElement>) => {
    console.log(senderId);
    navigate(`/otherProfile/${String(senderId)}/feed`);
    event.stopPropagation();
  };

  const notiContent: NotiContent = {
    FOLLOWED: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님을 팔로우했습니다.
      </p>
    ),
    NEW_POST: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 새로운 게시글을 작성했습니다.
      </p>
    ),
    POST_COMMENT: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 게시글에 댓글을 작성했습니다.
      </p>
    ),
    POST_RE_COMMENT: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 댓글에 대댓글을 작성했습니다.
      </p>
    ),
    ANSWER: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 질문에대한 답변을 남겼습니다.
      </p>
    ),
    ANSWER_COMMENT: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 답변에 댓글을 작성했습니다.
      </p>
    ),
    ANSWER_RE_COMMENT: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 댓글에 대댓글을 작성했습니다.
      </p>
    ),
    ADD_LIKE_POST: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 게시물을 좋아요 했습니다.
      </p>
    ),
    ADD_LIKE_COMMENT: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 댓글을 좋아요 했습니다.
      </p>
    ),
    ADD_LIKE_ANSWER: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 답변을 좋아요 했습니다.
      </p>
    ),
    ADD_LIKE_ANSWER_COMMENT: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 댓글에 좋아요 했습니다.
      </p>
    ),
    COMMENT_PIN: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 댓글을 고정했습니다.
      </p>
    ),
    ANSWER_PIN: (senderId: string) => (
      <p>
        축하합니다! <span className="font-bold">{senderId}</span>님이 회원님의 답변을 채택했습니다.
      </p>
    ),
    ANSWER_COMMENT_PIN: (senderId: string) => (
      <p>
        <span className="font-bold">{senderId}</span>님이 회원님의 댓글을 고정했습니다.
      </p>
    ),
  };

  const handleContent = (notificationDetailType: notificationDetailType, senderNickName: string): JSX.Element | null => {
    const contentFn = notiContent[notificationDetailType];
    return contentFn ? contentFn(senderNickName) : null;
  };

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomPinNum = getRandomInt(2, 10);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {notificationData && notificationData?.pages[0].content.length > 0 ? (
        <SwipeableList>
          {() => (
            <>
              <div className={'mt-9 flex h-full flex-col text-lightText dark:text-white'}>
                {notificationData &&
                  notificationData.pages
                    .map((i) => i.content)
                    .flat()
                    .map((noti) => {
                      return (
                        <SwipeableListItem
                          key={noti.notificationId + String(Date.now())}
                          swipeLeft={{
                            content: (
                              <div className="flex h-full w-full items-center justify-end bg-[#ff5232] p-4 text-white dark:bg-[#a51b0b]">
                                <span className="flex items-center gap-2 text-lg">
                                  삭제
                                  <BsFillTrashFill />
                                </span>
                              </div>
                            ),
                            action: async () => {
                              await deleteNotiMutateAsync(noti.notificationId);
                              console.log('Deleting item:', noti.notificationId);
                            },
                          }}
                        >
                          <li
                            onClick={() => handleNotiClick(noti.pageType, noti.pageId, noti.notificationId)}
                            key={noti.notificationId}
                            className={`flex w-full grow cursor-pointer items-center gap-3 bg-lightIvory px-8 pb-3 pt-6 dark:bg-darkNavy`}
                          >
                            <img
                              onClick={(event) => handleImgClick(noti.senderId, event)}
                              src={S3_URL + noti.senderProfileImage}
                              alt={noti.senderProfileImage}
                              className={'h-[65px] w-[65px] shrink-0 rounded-full object-cover ' + (noti.notificationStatus === 'UNREAD' ? '' : 'opacity-40')}
                            />

                            <div className={'flex flex-col gap-0.5 text-lg ' + (noti.notificationStatus === 'UNREAD' ? '' : 'opacity-50')}>
                              {handleContent(noti.notificationDetailType, noti.senderNickName)}
                              <p className="text-sm opacity-50">{timeForToday(noti.notifiedAt)}</p>
                            </div>
                          </li>
                        </SwipeableListItem>
                      );
                    })}
              </div>
              <div ref={ref} />
            </>
          )}
        </SwipeableList>
      ) : (
        <>
          {notificationData && (
            <div className="relative mt-8 flex min-h-[calc(100vh-164px)] w-full flex-col items-center justify-center gap-4 p-4 text-lightText dark:text-white">
              <img src={S3_URL + 'levels/lv' + randomPinNum + 'L.png'} alt="notiImg" className="aspect-square h-[200px] w-[200px] opacity-75 brightness-[2] dark:opacity-70 dark:brightness-[1]" />
              <span className="text-xl opacity-50">새 알림이 없어요!</span>
            </div>
          )}
        </>
      )}
    </>
  );
}
