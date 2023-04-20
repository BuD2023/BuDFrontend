import { BsDot, BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcPortraitMode, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { timeForToday } from '../../store/commentDummy';
import { useCommunityAnswerQuery, useCommunityDetailQuery } from '../../store/module/useCommunityDetailQuery';
import DefaultProfileImage from '../../assets/DefaultProfileImage.webp';
import LikeCommentScrap from '../common/LikeCommentScrap';
import { PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';
import ImagePeek from '../common/ImagePeek';
import { useState } from 'react';
import { S3_URL } from '../../constant/union';
import { useFollowMutation } from '../../store/module/useCommunityQuery';

export default function CommunityDetailPost() {
  const { id: questionId } = useParams();
  const navigate = useNavigate();
  const { data: questionData, isLoading: questionIsLoading, error: questionError } = useCommunityDetailQuery(Number(questionId));

  const userNickname = 'JHni2';
  const [userId, setUserId] = useState(0);
  const { mutate } = useFollowMutation(Number(userId));

  const handleClickFollow = (e: React.MouseEvent<HTMLElement>, memberId: number, memberNickname?: string) => {
    if (memberNickname === userNickname) return;
    setUserId(memberId);
    e.stopPropagation();
    mutate();
  };

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });
  if (questionError) {
    navigate('/NotFound');
  }

  if (questionIsLoading) {
    return <div className="mb-6 flex h-[298px] w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"></div>;
  }

  return (
    <div className="mb-6 flex w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/otherProfile/${questionData?.member.id}`);
              }}
              src={DefaultProfileImage}
              alt={questionData?.member.nickname}
              className="w-[58px] cursor-pointer rounded-full"
            />
            <div className="pl-3">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/otherProfile/${questionData?.member.id}`);
                }}
                className="text-xl font-bold"
              >
                {questionData?.member.nickname}
              </p>
              <p className="text-[17px] opacity-50">{timeForToday(questionData?.createdAt as string)}</p>
            </div>
          </div>
          <div className="text-end grow font-bold">
            <div className="flex h-full items-center justify-end">
              <div onClick={(e) => handleClickFollow(e, Number(questionData?.member.id), questionData?.member.nickname)} className="flex h-full cursor-pointer items-center justify-end gap-3">
                <FcPortraitMode />
                <p>팔로우</p>
              </div>
            </div>
          </div>
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
        postType={questionData?.postType as PostTypeType}
        likeCount={questionData?.likeCount as number}
        commentCount={questionData?.commentCount as number}
        postId={questionData?.id as number}
      />
    </div>
  );
}
