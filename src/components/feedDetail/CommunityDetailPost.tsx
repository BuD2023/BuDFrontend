import { BsDot, BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FcLike, FcPortraitMode, FcSms, FcVoicePresentation } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { timeForToday } from '../../store/commentDummy';
import { useCommunityDetailQuery } from '../../store/module/useCommunityDetailQuery';
import DefaultProfileImage from '../../assets/DefaultProfileImage.webp';
import LikeCommentScrap from '../common/LikeCommentScrap';
import { PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';
import ImagePeek from '../common/ImagePeek';
import { useState } from 'react';
import { S3_URL } from '../../constant/union';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import NotFound from '../../pages/NotFound';

export default function CommunityDetailPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useCommunityDetailQuery(Number(id));

  const [userId, setUserId] = useState(0);
  const { mutate } = useFollowMutation(Number(userId));

  const handleClickFollow = (e: React.MouseEvent<HTMLElement>, memberId: number) => {
    setUserId(memberId);
    e.stopPropagation();
    mutate();
  };

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });
  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <>
        <div className="mb-6 flex h-[40vh] w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"></div>
        <div className="mb-6 flex h-[40vh] w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"></div>
      </>
    );
  }

  return (
    <div className="mb-6 flex w-full cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/otherProfile/${data?.member.id}`);
              }}
              src={DefaultProfileImage}
              alt={data?.member.nickname}
              className="w-[58px] rounded-full"
            />
            <div className="pl-3">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/otherProfile/${data?.member.nickname}`);
                }}
                className="text-xl font-bold"
              >
                {data?.member.nickname}
              </p>
              <p className="text-[17px] opacity-50">{timeForToday(data?.createdAt as string)}</p>
            </div>
          </div>
          <div className="text-end grow font-bold">
            <div onClick={(e) => handleClickFollow(e, Number(data?.member.id))} className="flex h-full items-center justify-end gap-3">
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
      {data !== undefined && data.imageUrls.length > 0 && data.imageUrls[0] !== null && <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={data.imageUrls.map((imgeUrl) => S3_URL + imgeUrl)} />}
      <LikeCommentScrap postType={data?.postType as PostTypeType} likeCount={data?.likeCount as number} commentCount={data?.commentCount as number} postId={data?.id as number} />
    </div>
  );
}
