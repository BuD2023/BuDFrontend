import { FcCheckmark, FcPortraitMode } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunityDetailQuery } from '../../store/module/useCommunityDetailQuery';
import LikeCommentScrap from '../common/LikeCommentScrap';
import ImagePeek from '../common/ImagePeek';
import { useEffect, useState } from 'react';
import { S3_URL } from '../../constant/union';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import { postType } from '../community/_Community.interface';
import { timeForToday } from '../../utils/timeForToday';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';
import LazyLoadImage from '../../utils/LazyLoadImage';
import PicModal from '../common/PicModal';

interface CommunityDetailPostProps {
  setQuestionUserId?: any;
  setCommentCount?: any;
}

export default function CommunityDetailPost({ setQuestionUserId, setCommentCount }: CommunityDetailPostProps) {
  const { id: questionId } = useParams();
  const navigate = useNavigate();
  const { data: questionData, isLoading: questionIsLoading, error: questionError, refetch, isRefetching, isSuccess } = useCommunityDetailQuery(Number(questionId));

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  const [userId, setUserId] = useState<number>();
  const { mutate } = useFollowMutation(Number(userId), Number(questionId));

  useEffect(() => {
    setQuestionUserId && setQuestionUserId(questionData?.member.id);
    setCommentCount && isSuccess && setCommentCount(questionData?.commentCount);
  }, [questionData?.member.id, isRefetching]);

  const handleClickFollow = (e: React.MouseEvent<HTMLElement>, memberId: number) => {
    if (memberId === logInUserInfo?.id) return;
    setUserId(memberId);
    e.stopPropagation();
    mutate();
  };

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  useEffect(() => {
    refetch();
  }, [questionIsLoading]);

  if (questionIsLoading) {
    return <div className="mb-6 flex h-[298px] w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"></div>;
  }

  // if (questionError) {
  //   navigate('/NotFound');
  // }

  return (
    <div className="mb-6 flex w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      {questionData && (
        <>
          <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-1">
                <LazyLoadImage
                  onClick={(e) => {
                    e.stopPropagation();
                    if (questionData?.member.id === logInUserInfo?.id) {
                      navigate(`/myProfile/feed`);
                    } else {
                      navigate(`/otherProfile/${questionData?.member.id}/feed`);
                    }
                  }}
                  src={S3_URL + (questionData?.member.profileImg as string)}
                  alt={questionData?.member.nickname}
                  className="aspect-square h-[58px] w-[58px] cursor-pointer rounded-full object-cover"
                />
                <div className="flex flex-col gap-1.5 pl-3">
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      if (questionData?.member.id === logInUserInfo?.id) {
                        navigate(`/myProfile/feed`);
                      } else {
                        navigate(`/otherProfile/${questionData?.member.id}/feed`);
                      }
                    }}
                    className="cursor-pointer text-xl font-bold"
                  >
                    {questionData?.member.nickname}
                  </p>
                  <p className="text-[17px] opacity-50">{timeForToday(questionData?.createdAt as string)}</p>
                </div>
              </div>
              {questionData?.member.id !== logInUserInfo?.id && questionData.member.status !== 'WITHDREW' && (
                <div className="text-end font-bold">
                  <div onClick={(e) => handleClickFollow(e, Number(questionData?.member.id))} className="flex h-full cursor-pointer items-center justify-end gap-3 whitespace-nowrap">
                    {questionData?.follow ? (
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
              <div className="rounded-[30px] bg-greyBeige px-3 py-2 text-[14px] dark:bg-sky">{`${questionData?.postType === 'FEED' ? '개발 피드' : 'Q & A 피드'}`}</div>
            </div>
            <div className="w-full">
              <h1 className="mb-6 text-lg font-bold">{questionData?.title}</h1>
              <p className="text-base">{questionData?.content}</p>
            </div>
          </div>
          {questionData !== undefined && questionData.imageUrls.length > 0 && questionData.imageUrls[0] !== null && (
            <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={questionData.imageUrls.map((imgeUrl) => S3_URL + imgeUrl)} />
          )}
          <LikeCommentScrap
            scrap={questionData?.scrap as boolean}
            like={questionData?.like as boolean}
            postType={questionData?.postType as postType}
            likeCount={questionData?.likeCount as number}
            commentCount={questionData?.commentCount as number}
            postId={questionData?.id as number}
          />
        </>
      )}
    </div>
  );
}
