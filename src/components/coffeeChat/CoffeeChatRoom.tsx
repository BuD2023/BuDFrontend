import { useEffect } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DefaultImage from '../../assets/Monica.webp';
import { useAllChatroomQuery, useSearchChatroomQuery } from '../../store/module/useCoffeeChatQuery';
import { useInView } from 'react-intersection-observer';
import { ChatroomListContentType, CoffeeChatRoomPropsType } from './_CoffeeChat.interface';
import { S3_URL } from '../../constant/union';
import { timeForToday } from '../../utils/timeForToday';
import LazyLoadImage from '../../utils/LazyLoadImage';

export default function CoffeeChatRoom({ inputValue }: CoffeeChatRoomPropsType) {
  //리액트 쿼리 - useQuery
  const {
    isLoading: allLoading,
    isError: allError,
    isFetching: allIsFetching,
    isFetchingNextPage: allIsFetchingNextPage,
    data: chatRooms,
    fetchNextPage: fetchAllNextPage,
    hasNextPage: allHasNextPage,
  } = useAllChatroomQuery();

  const {
    isLoading: searchLoading,
    isError: searchError,
    isFetching: searchIsFetching,
    isFetchingNextPage: searchIsFetchingNextpage,
    data: searchData,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: searchHasNextPage,
  } = useSearchChatroomQuery(inputValue);

  // 페이지 이동
  const navigate = useNavigate();

  // 인피니티 스크롤
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inputValue) {
      if (inView && searchHasNextPage && !searchIsFetching && !searchIsFetchingNextpage) fetchSearchNextPage();
    } else {
      if (inView && allHasNextPage && !allIsFetching && !allIsFetchingNextPage) fetchAllNextPage();
    }
  }, [inView]);

  //뿌리는 데이터
  let chatRoomsResult =
    inputValue.length > 0 ? (searchData?.pages.map((i) => i.content).flat() as ChatroomListContentType[]) : (chatRooms?.pages.map((i) => i.content).flat() as ChatroomListContentType[]);

  if (allLoading || searchLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="min-h-[250px] w-full list-none rounded-2xl bg-midIvory dark:bg-midNavy"></li>
        ))}
      </>
    );
  }
  if (allError || searchError) {
    navigate('/NotFound');
  }

  return (
    <>
      {chatRoomsResult && chatRoomsResult.length > 0 ? (
        chatRoomsResult.map((room, index) => (
          <div onClick={() => navigate(`/chatRoom/${room.chatRoomId}`)} key={room.title + String(index)} className="relative flex min-h-[250px] w-full flex-col">
            <div className="absolute inset-0 flex cursor-pointer flex-col justify-between rounded-2xl bg-midIvory p-6 dark:bg-midNavy">
              <div className="truncate text-[19px] font-semibold leading-7">{room.title}</div>
              <div className="flex w-full gap-2">
                {room.hashTags.map((item, idx) => (
                  <div key={idx} className="flex items-center rounded-[40px] bg-greyBeige pl-2 pr-2.5 pt-1 pb-1.5 dark:bg-sky">
                    {`# ${item}`}
                  </div>
                ))}
              </div>
              <div className="leading-5">{room.description}</div>
              <div className="flex w-full items-center justify-between text-[16px]">
                <div className="flex gap-2">
                  <LazyLoadImage src={room.hostProfileUrl ? S3_URL + room.hostProfileUrl : DefaultImage} alt={'host profileImage'} className={'h-[60px] w-[60px] rounded-full object-cover'} />
                  <div className="flex flex-col justify-center gap-1.5">
                    <div className="font-bold">Host</div>
                    <div className="text-[18px]">{room.hostName}</div>
                  </div>
                </div>
                <div className="flex h-full flex-col items-end justify-center gap-1.5">
                  <div className="flex items-center font-semibold">
                    <BsFillPersonFill />
                    <span>{` ${room.numberOfMembers}명이 채팅 중`}</span>
                  </div>
                  <div className="text-[18px]">{timeForToday(room.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="relative mb-5 flex min-h-[250px] w-full min-w-[355px] flex-col">
          <div className="absolute inset-y-0 flex w-full flex-col items-center justify-center rounded-2xl bg-midIvory p-6 dark:bg-midNavy">
            <div className="text-[19px] font-semibold leading-6">검색된 채팅방이 없습니다.</div>
          </div>
        </div>
      )}
      <div ref={ref} />
    </>
  );
}
