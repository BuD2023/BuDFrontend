import { FcCheckmark, FcPortraitMode } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LikeCommentScrap from '../common/LikeCommentScrap';
import ImagePeek from '../common/ImagePeek';
import PicModal from '../common/PicModal';
import { S3_URL } from '../../constant/union';
import { timeForToday } from '../../utils/timeForToday';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import { useMyScrapsQuery } from '../../store/module/useMyProfileQuery';

export default function ScrapPostFormat({ refetch, userData, resultData, setFollowIsSuccess }: any) {
  const navigate = useNavigate();

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  const [userId, setUserId] = useState<number>();

  const { mutate, isSuccess } = useFollowMutation(Number(userId));
  const {
    data: myScrapsData,
    isLoading: myScrapsIsLoading,
    error: myScrapsError,
    isFetching: myScrapsIsFetching,
    isFetchingNextPage: myScrapsIsFetchingNextPage,
    fetchNextPage: myScrapsFetchNextPage,
    hasNextPage: myScrapsHasNextPage,
    refetch: myScrapsRefetch,
  } = useMyScrapsQuery();

  const handleClickFollow = (e: React.MouseEvent<HTMLElement>, memberId: number) => {
    setUserId(memberId);
    e.stopPropagation();
    // setFollowIsSuccess(isSuccess);
    mutate();
  };

  useEffect(() => {
    myScrapsRefetch();
    // setFollowIsSuccess(isSuccess);
  }, [isSuccess]);

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <ul className="w-full">
        {resultData && userData && resultData.length > 0 ? (
          resultData.map((data: any) => (
            <li
              onClick={(e) => {
                e.preventDefault();
                if (data.postType === 'QNA') {
                  navigate(`/communityQADetail/${data.postId}`);
                } else {
                  navigate(`/communityFeedDetail/${data.postId}`);
                }
              }}
              key={data.postId}
              className="mb-6 flex cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"
            >
              <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
                <div className="flex w-full">
                  <div className="flex gap-1">
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        if (resultData.id === userData.id) {
                          navigate(`/myProfile/feed`);
                          return;
                        } else {
                          navigate(`/otherProfile/${data.postRegisterMemberId}/feed`);
                          return;
                        }
                      }}
                      src={S3_URL + data.postRegisterMemberProfileImg}
                      alt={data.title}
                      className="w-[58px] rounded-full"
                    />
                    <div className="pl-3">
                      <p className="text-xl font-bold">{data.postRegisterMemberNickname}</p>
                      <p className="text-[17px] opacity-50">{timeForToday(data.createdAt)}</p>
                    </div>
                  </div>
                  {data.postRegisterMemberId !== userData.id && (
                    <div className="text-end grow font-bold">
                      <div
                        onClick={(e) => {
                          handleClickFollow(e, data.postRegisterMemberId);
                        }}
                        className="flex h-full items-center justify-end gap-3"
                      >
                        {data.follow ? (
                          <>
                            <FcCheckmark size={21} />
                            <p>팔로잉</p>
                          </>
                        ) : (
                          <>
                            <FcPortraitMode />
                            <p>팔로우</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex text-[16px] font-semibold">
                  <div className="rounded-[30px] bg-greyBeige px-3 py-2 text-[14px] dark:bg-sky">{`${data.postType === 'FEED' ? '개발 피드' : 'Q & A 피드'}`}</div>
                </div>
                <div className="w-full">
                  <h1 className="mb-6 text-lg font-bold">{data.title}</h1>
                  <p className="text-base">{data.content}</p>
                </div>
              </div>
              {data.imageUrls.length > 0 && data.imageUrls[0] !== null && <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={data.imageUrls.map((imgeUrl: string) => S3_URL + imgeUrl)} />}
              <LikeCommentScrap refetch={refetch} like={data.like} scrap={true} postType={data.postType} likeCount={data.likeCount} commentCount={data.commentCount} postId={data.postId} />
            </li>
          ))
        ) : (
          <div className="mb-6 flex h-[298px] flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="flex h-[200px] w-full items-center justify-center p-4 text-base font-semibold text-lightText dark:text-white">스크랩된 게시글이 없습니다.</div>
          </div>
        )}
      </ul>
    </>
  );
}
