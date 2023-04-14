import { FcPortraitMode, FcVoicePresentation } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyData, IBlogData } from '../../store/dummy';
import { BsDot, BsFillHandThumbsUpFill } from 'react-icons/bs';
import { timeForToday } from '../../store/commentDummy';
import LikeCommentScrap from '../common/LikeCommentScrap';
import { PostTypeType } from '../../apiFetcher/communityInfo/getCommunityPost';

export default function CommunityQADetailPost() {
  const { id } = useParams();
  const data = dummyData.find((i) => i.id === Number(id)) as IBlogData;
  const navigate = useNavigate();

  return (
    <li className="flex w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/otherProfile/${data?.userName}`);
              }}
              src={data?.img}
              alt={data?.title}
              className="w-[58px] cursor-pointer rounded-full"
            />
            <div className="pl-3 ">
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">지현</p>
                <BsDot />
                <p className="text-[17px] opacity-50">{timeForToday(data?.createdAt)}</p>
              </div>
              <div className="mt-1 text-[16px] opacity-50">프론트엔드 개발자</div>
            </div>
          </div>
          <div className="text-end grow font-bold">
            <div className="flex h-full items-center justify-end ">
              <div className="flex cursor-pointer gap-3">
                <FcPortraitMode />
                <p>팔로우</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="mb-6 text-lg font-bold">{data?.title}</h1>
          <p className="text-base">{data?.detail}</p>
        </div>
      </div>
      <LikeCommentScrap postType={data.type as PostTypeType} likeCount={data?.likeCount as number} commentCount={data?.commentCount as number} postId={data?.id as number} />
    </li>
  );
}
