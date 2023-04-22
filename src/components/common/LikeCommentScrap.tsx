import { useEffect, useState } from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useRecoilValueLoadable } from 'recoil';
import { useCommunityLikeMutation, useCommunityScrapMutation } from '../../store/module/useCommunityQuery';
import { useMyScrapsQuery } from '../../store/module/useMyProfileQuery';
import { getMyPageInfo } from '../../store/recoil/user';
import { LikeCommentScrapPropsType } from './_Common.interface';

export default function LikeCommentScrap({ postType, likeCount, commentCount, postId, like, scrap }: LikeCommentScrapPropsType) {
  // 사용자 정보
  const getMyPageInfoLodable = useRecoilValueLoadable(getMyPageInfo);
  const myPageInfo: any = 'hasValue' === getMyPageInfoLodable.state ? getMyPageInfoLodable.contents : {};

  const { mutate: likeMutate, isSuccess: likeIsSuccess } = useCommunityLikeMutation(postId, myPageInfo.id, postType);
  const { mutate: scrapMutate, isSuccess: scrapIsSuccess } = useCommunityScrapMutation(postId, myPageInfo.id, postType);

  const [likeSuccess, setLikeSuccess] = useState(false);
  const [scrapSuccess, setScrapSuccess] = useState(false);

  useEffect(() => {
    if (likeSuccess || scrapSuccess) {
      if (likeIsSuccess || scrapIsSuccess) {
        // refetch();
      }
    }
  }, [likeSuccess, likeIsSuccess, scrapSuccess, scrapIsSuccess]);

  return (
    <div className="flex h-[54px] w-full items-center justify-between rounded-b-[20px] bg-[#a49c7c] p-4 text-base text-white dark:bg-[#2c2e34]">
      <div className="flex gap-6">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={async (e) => {
            e.stopPropagation();
            likeMutate();
            setLikeSuccess(true);
          }}
        >
          {postType === 'FEED' ? (
            like ? (
              <FcLike size="20px" />
            ) : (
              <FcLike className="brightness-[5]" size="20px" />
            )
          ) : like ? (
            <BsFillHandThumbsUpFill size="20px" className="text-[#fbceb1]" />
          ) : (
            <BsFillHandThumbsUpFill size="20px" className="text-white" />
          )}
          {likeCount}
        </div>
        <div className="flex items-center gap-2">
          {postType === 'FEED' ? <FcSms size="20px" /> : <FcVoicePresentation size="30px" />}
          {commentCount}
        </div>
      </div>
      <div
        className="flex cursor-pointer items-center justify-end gap-2"
        onClick={(e) => {
          e.stopPropagation();
          scrapMutate();
          setScrapSuccess(true);
        }}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
          <path fill={scrap ? `#f9e288` : 'white'} d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path>
        </svg>
        {`스크랩`}
      </div>
    </div>
  );
}
