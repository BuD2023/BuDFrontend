import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcPortraitMode, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { timeForToday } from '../../store/commentDummy';
import { useCommunityPostQuery } from '../../store/module/useCommunityQuery';
import DefaultProfileImage from '../../assets/DefaultProfileImage.webp';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { CommunityPostListContentType, PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';
import { SortAndOrderType } from '../../pages/Community';
import LikeCommentScrap from './LikeCommentScrap';
import ImagePeek from './ImagePeek';
import PicModal from './PicModal';

interface IPostFormatPropsType {
  inputValue: string;
  communityFilter: PostTypeType | null;
  sortAndOrder: SortAndOrderType;
}

export default function PostFormat({ inputValue, communityFilter, sortAndOrder }: IPostFormatPropsType) {
  const { sort, order } = sortAndOrder;
  const navigate = useNavigate();
  const { isLoading, data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useCommunityPostQuery(inputValue, sort, order);
  let resultData = data?.pages.map((i) => i.content).flat() as CommunityPostListContentType[];
  console.log(resultData);
  if (communityFilter !== null) {
    if (communityFilter === 'FEED') resultData = resultData?.filter((i) => i.postType === 'FEED');
    if (communityFilter === 'QNA') resultData = resultData?.filter((i) => i.postType === 'QNA');
  }

  // 인피니티 스크롤
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  // 사진 미리보기
  let imgPeek = resultData?.map((i) => i?.imageUrls).flat();
  // console.log(imgPeek);
  // let imageArr = resultData?.map((i) => i?.imageUrls.map((j) => URL.createObjectURL(j))).flat();

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <ul className="w-full">
        {data?.pages && resultData && resultData?.length > 0 ? (
          resultData?.map((data, idx) => (
            <li
              onClick={(e) => {
                e.preventDefault();
                if (data?.postType === 'QNA') {
                  navigate(`/communityQADetail/${data.id}`);
                } else {
                  navigate(`/communityFeedDetail/${data.id}`);
                }
              }}
              key={idx}
              className="mb-6 flex cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"
            >
              <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
                <div className="flex w-full">
                  <div className="flex gap-1">
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/otherProfile/${data.member.id}`);
                      }}
                      src={data.member.profileImg ? data.member.profileImg : DefaultProfileImage}
                      alt={data.title}
                      className="w-[58px] rounded-full"
                    />
                    <div className="pl-3">
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/otherProfile/${data.member.id}`);
                        }}
                        className="text-xl font-bold"
                      >
                        {data.member.username}
                      </p>
                      <p className="text-[17px] opacity-50">{timeForToday(data.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-end grow font-bold">
                    <div className="flex h-full items-center justify-end gap-3">
                      <FcPortraitMode />
                      <p>팔로우</p>
                    </div>
                  </div>
                </div>
                <div className="flex text-[16px] font-semibold">
                  <div className="rounded-[30px] bg-greyBeige px-3 py-2 text-[14px] dark:bg-sky">{`${data.postType === 'FEED' ? '개발 피드' : 'Q & A 피드'}`}</div>
                </div>
                <div className="w-full">
                  <h1 className="mb-6 text-lg font-bold">{data.title}</h1>
                  <p className="text-base">{data.content}</p>
                </div>
              </div>
              <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={imgPeek as string[]} />
              <LikeCommentScrap postType={data.postType} likeCount={data.likeCount} commentCount={data.commentCount} postId={data.id} />
            </li>
          ))
        ) : (
          <div className="mb-6 flex h-[298px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="flex h-[200px] w-full items-center justify-center p-4 text-[24px] font-semibold text-lightText dark:text-white">해당 검색 결과가 없습니다.</div>
          </div>
        )}
      </ul>
      <div ref={ref} />
    </>
  );
}
