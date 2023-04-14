import React from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';

interface LikeCommentScrapPropsType {
  postType: PostTypeType;
  likeCount: number;
  commentCount: number;
}

export default function LikeCommentScrap({ postType, likeCount, commentCount }: LikeCommentScrapPropsType) {
  return (
    <>
      {postType === 'FEED' ? (
        <>
          <div className="flex items-center gap-2">
            <FcLike size="20px" />
            {likeCount}
          </div>
          <div className="flex items-center gap-2">
            <FcSms size="20px" />
            {commentCount}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <BsFillHandThumbsUpFill size="20px" className="text-[#fbceb1]" />
            {likeCount}
          </div>
          <div className="flex items-center gap-2">
            <FcVoicePresentation size="30px" />
            {commentCount}
          </div>
        </>
      )}
    </>
  );
}
