import { FcCheckmark, FcPortraitMode } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LikeCommentScrap from '../common/LikeCommentScrap';
import ImagePeek from '../common/ImagePeek';
import PicModal from '../common/PicModal';
import { S3_URL } from '../../constant/union';
import { timeForToday } from '../../utils/timeForToday';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import LazyLoadImage from '../../utils/LazyLoadImage';

export default function FeedPostFormat({ resultData, userData, refetch, profilePostIsLoading, memberStatus }: any) {
  const navigate = useNavigate();

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  const [userId, setUserId] = useState<number>();

  const { mutateAsync } = useFollowMutation(Number(userId));

  const handleClickFollow = async (e: React.MouseEvent<HTMLElement>, memberId: number) => {
    setUserId(memberId);
    e.stopPropagation();
    await mutateAsync();
    refetch();
  };

  if (profilePostIsLoading) {
    return <div className="mb-6 flex h-[298px] w-full flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"></div>;
  }

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <ul className="w-full">
        {userData && resultData && resultData.length > 0 ? (
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
                <div className="flex w-full justify-between">
                  <div className="flex gap-1">
                    <LazyLoadImage
                      onClick={(e) => {
                        e.stopPropagation();
                        if (userData.id !== logInUserInfo?.id) {
                          navigate(`/otherProfile/${userData.id}/feed`);
                          return;
                        } else {
                          navigate(`/myProfile/feed`);
                          return;
                        }
                      }}
                      src={S3_URL + userData.profileUrl}
                      alt={userData.nickName}
                      className="aspect-square h-[58px] w-[58px] rounded-full object-cover"
                    />
                    <div className="pl-3">
                      <p
                        className="cursor-pointer text-xl font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (userData.id !== logInUserInfo?.id) {
                            navigate(`/otherProfile/${userData.id}/feed`);
                            return;
                          } else {
                            navigate(`/myProfile/feed`);
                            return;
                          }
                        }}
                      >
                        {userData.nickName}
                      </p>
                      <p className="text-[17px] opacity-50">{timeForToday(data.createdAt)}</p>
                    </div>
                  </div>
                  {userData.id !== logInUserInfo?.id ||
                    userData.status !== 'WITHDREW' ||
                    (memberStatus !== 'WITHDREW' && (
                      <div className="text-end font-bold">
                        <div
                          onClick={(e) => {
                            handleClickFollow(e, data.postRegisterMemberId);
                          }}
                          className="flex h-full items-center justify-end gap-3 whitespace-nowrap"
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
                    ))}
                </div>
                <div className="flex text-[16px] font-semibold">
                  <div className="rounded-[30px] bg-greyBeige px-3 py-2 text-[14px] dark:bg-sky">{`${data.postType === 'FEED' ? '개발 피드' : 'Q & A 피드'}`}</div>
                </div>
                <div className="w-full">
                  <h1 className="mb-6 text-lg font-bold">{data.title}</h1>
                  <p className="text-base">{data.content}</p>
                </div>
              </div>
              {data.imageUrls.length > 0 && data.imageUrls[0] !== null && <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={data.imageUrls.map((imgeUrl: any) => S3_URL + imgeUrl)} />}
              <LikeCommentScrap refetch={refetch} scrap={data.scrap} like={data.like} postType={data.postType} likeCount={data.likeCount} commentCount={data.commentCount} postId={data.postId} />
            </li>
          ))
        ) : (
          <div className="mb-6 flex h-[298px] flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="flex h-[200px] w-full items-center justify-center p-4 text-base font-semibold text-lightText dark:text-white">피드 게시글이 없습니다.</div>
          </div>
        )}
      </ul>
    </>
  );
}
