import React from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useLocation } from 'react-router-dom';
import { PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';
import { useCommunityLikeMutation, useCommunityScrapMutation } from '../../store/module/useCommunityQuery';

interface LikeCommentScrapPropsType {
  postType: PostTypeType;
  likeCount: number;
  commentCount: number;
  postId: number;
  refetch: any;
}

export default function LikeCommentScrap({ postType, likeCount, commentCount, postId, refetch }: LikeCommentScrapPropsType) {
  const { mutate: likeMutate } = useCommunityLikeMutation(postId);
  const { mutate: scrapMutate } = useCommunityScrapMutation(postId);
  const url = useLocation();

  return (
    <div className="flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#a49c7c] p-4 text-base text-white dark:bg-[#2c2e34]">
      {postType === 'FEED' ? (
        <>
          <div
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              likeMutate();
            }}
          >
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
          <div
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              likeMutate();
            }}
          >
            <BsFillHandThumbsUpFill size="20px" className="text-[#fbceb1]" />
            {likeCount}
          </div>
          <div className="flex items-center gap-2">
            <FcVoicePresentation size="30px" />
            {commentCount}
          </div>
        </>
      )}
      <div
        className="flex grow items-center justify-end gap-2"
        onClick={(e) => {
          e.stopPropagation();
          scrapMutate();
          // if (url.pathname === '/myProfile') refetch();
        }}
      >
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
          <path fill={`#f9e288`} d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path>
        </svg>
        스크랩
      </div>
    </div>
  );
}
