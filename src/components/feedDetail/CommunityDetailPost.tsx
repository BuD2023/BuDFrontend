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
import { useRecoilValueLoadable } from 'recoil';
import { getMyPageInfo } from '../../store/recoil/user';

interface CommunityDetailPostProps {
  setQuestionUserId?: any;
}

export default function CommunityDetailPost(props: CommunityDetailPostProps) {
  const { id: questionId } = useParams();
  const navigate = useNavigate();
  const { data: questionData, isLoading: questionIsLoading, error: questionError, refetch } = useCommunityDetailQuery(Number(questionId));

  // 사용자 정보
  const getMyPageInfoLodable = useRecoilValueLoadable(getMyPageInfo);
  const myPageInfo: any = 'hasValue' === getMyPageInfoLodable.state ? getMyPageInfoLodable.contents : {};

  const [userId, setUserId] = useState<number>();
  const { mutate } = useFollowMutation(Number(userId));

  useEffect(() => {
    props.setQuestionUserId && props.setQuestionUserId(questionData?.member.id);
  }, [questionData?.member.id]);

  const handleClickFollow = (e: React.MouseEvent<HTMLElement>, memberId: number, memberNickname?: string) => {
    if (memberNickname === myPageInfo.nickName) return;
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

  useEffect(() => {
    refetch();
  }, [questionIsLoading]);

  if (questionIsLoading) {
    return <div className="mb-6 flex h-[298px] w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"></div>;
  }

  return (
    <div className="mb-6 flex w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      {questionData && (
        <>
          <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
            <div className="flex w-full">
              <div className="flex gap-1">
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    if (questionData?.member.nickname === myPageInfo.nickName) {
                      navigate(`/myProfile/feed`);
                    } else {
                      navigate(`/otherProfile/${questionData?.member.id}/feed`);
                    }
                  }}
                  src={S3_URL + (questionData?.member.profileImg as string)}
                  alt={questionData?.member.nickname}
                  className="w-[58px] cursor-pointer rounded-full"
                />
                <div className="pl-3">
                  <p className="text-xl font-bold">{questionData?.member.nickname}</p>
                  <p className="text-[17px] opacity-50">{timeForToday(questionData?.createdAt as string)}</p>
                </div>
              </div>
              {questionData?.member.nickname !== myPageInfo.nickName && (
                <div className="text-end grow font-bold">
                  <div onClick={(e) => handleClickFollow(e, Number(questionData?.member.id), questionData?.member.nickname)} className="flex h-full items-center justify-end gap-3">
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
