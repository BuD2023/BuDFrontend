import { FcCheckmark, FcPortraitMode } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunityPostQuery } from '../../store/module/useCommunityQuery';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import LikeCommentScrap from './LikeCommentScrap';
import ImagePeek from './ImagePeek';
import PicModal from './PicModal';
import { S3_URL } from '../../constant/union';
import { PostFormatPropsType } from './_Common.interface';
import { CommunityPostListContentType, postType } from '../community/_Community.interface';
import { timeForToday } from '../../utils/timeForToday';
import { useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';
import { communitySorting } from '../../store/recoil/communitySorting';

export default function PostFormat({ inputValue }: PostFormatPropsType) {
  const { filter } = useParams();

  // 정렬 Recoil
  const sortAndOrder = useRecoilValue(communitySorting);
  const { sort, order } = sortAndOrder;

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  const navigate = useNavigate();
  const POSTLIST_SIZE = 10;

  //리액트 쿼리
  const { isLoading, isError, data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage, refetch, isSuccess } = useCommunityPostQuery(
    inputValue,
    sort,
    order,
    POSTLIST_SIZE,
    filter === 'all' ? 'ALL' : (filter as postType)
  );
  const [userId, setUserId] = useState<number>();
  const { mutateAsync } = useFollowMutation(Number(userId));

  const handleClickFollow = async (e: React.MouseEvent<HTMLElement>, memberId: number) => {
    setUserId(memberId);
    e.stopPropagation();
    await mutateAsync();
    refetch();
  };

  let resultData = data?.pages.map((i) => i.content.map((j) => ({ ...j, imageUrls: j.imageUrls.map((j) => j !== null && S3_URL + j) }))).flat() as CommunityPostListContentType[];

  // 인피니티 스크롤
  const { ref, inView } = useInView({ threshold: 0.1 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="mb-4 flex h-[298px] w-full rounded-[20px] bg-midIvory dark:bg-midNavy"></li>
        ))}
      </>
    );
  }

  if (isError) {
    navigate('/NotFound');
  }

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <ul className="w-full">
        {data?.pages && resultData && resultData?.length > 0 ? (
          resultData?.map((data, idx) => (
            <li
              onClick={(e) => {
                e.preventDefault();
                if (data?.postType === 'QNA') {
                  navigate(`/communityQADetail/${data.id}`);
                } else {
                  navigate(`/communityFeedDetail/${data.id}`);
                }
              }}
              key={idx}
              className="mb-6 flex cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"
            >
              <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-1">
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        if (data.member.id === logInUserInfo?.id) {
                          navigate(`/myProfile/feed`);
                        } else {
                          navigate(`/otherProfile/${data.member.id}/feed`);
                        }
                      }}
                      src={S3_URL + data.member.profileImg}
                      alt={data.title}
                      className="aspect-square h-[58px] w-[58px] rounded-full object-cover"
                    />
                    <div className="w-full pl-3">
                      <p className="text-xl font-bold">{data.member.nickname}</p>
                      <p className="text-[17px] opacity-50">{timeForToday(data.createdAt)}</p>
                    </div>
                  </div>
                  {data.member.id !== logInUserInfo?.id && data.member.status !== 'WITHDREW' && (
                    <div className="text-end font-bold">
                      <div
                        onClick={(e) => {
                          handleClickFollow(e, data.member.id);
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
              {data.imageUrls && data.imageUrls.length > 0 && data.imageUrls[0] !== 'https://budproject.s3.ap-northeast-2.amazonaws.com/null' && (
                <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={data.imageUrls as string[]} />
              )}
              <LikeCommentScrap scrap={data.scrap} like={data.like} postType={data.postType} likeCount={data.likeCount} commentCount={data.commentCount} postId={data.id} refetch={refetch} />
            </li>
          ))
        ) : (
          <div className="mb-6 flex h-[298px] flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="flex h-[200px] w-full items-center justify-center p-4 text-[24px] font-semibold text-lightText dark:text-white">해당 검색 결과가 없습니다.</div>
          </div>
        )}
      </ul>
      <div ref={ref}></div>
    </>
  );
}
