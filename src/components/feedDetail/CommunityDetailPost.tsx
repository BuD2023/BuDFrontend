import { BsDot, BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcPortraitMode, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { timeForToday } from '../../store/commentDummy';
import { useCommunityDetailQuery } from '../../store/module/useCommunityDetailQuery';
import DefaultProfileImage from '../../assets/DefaultProfileImage.webp';
import LikeCommentScrap from '../common/LikeCommentScrap';
import { PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';

export default function CommunityDetailPost() {
  const { id } = useParams();

  const { isLoading, data } = useCommunityDetailQuery(Number(id));

  const navigate = useNavigate();

  return (
    <div className="mb-6 flex w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img
              onClick={(e) => {
                e.stopPropagation();
                // 수정 필요
                navigate(`/otherProfile/${data?.id}`);
              }}
              src={DefaultProfileImage}
              alt={data?.title}
              className="w-[58px] rounded-full"
            />
            <div className="pl-3">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  // 수정 필요
                  navigate(`/otherProfile/${data?.id}`);
                }}
                className="text-xl font-bold"
              >
                {/* 수정 필요 */}
                {data?.id}
              </p>
              <p className="text-[17px] opacity-50">{timeForToday(data?.createdAt as string)}</p>
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
          <div className="rounded-[30px] bg-greyBeige px-3 py-2 text-[14px] dark:bg-sky">{`${data?.postType === 'FEED' ? '개발 피드' : 'Q & A 피드'}`}</div>
        </div>
        <div className="w-full">
          <h1 className="mb-6 text-lg font-bold">{data?.title}</h1>
          <p className="text-base">{data?.content}</p>
        </div>
      </div>
      <div className="flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#a49c7c] p-4 text-base text-white dark:bg-[#2c2e34]">
        <LikeCommentScrap postType={data?.postType as PostTypeType} likeCount={data?.likeCount as number} commentCount={data?.commentCount as number} postId={data?.id as number} />
        <div className="flex grow items-center justify-end gap-2">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
            <path fill={`#f9e288`} d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z"></path>
          </svg>
          스크랩
        </div>
      </div>
    </div>
  );
}
