import { useState } from 'react';
import { BsDot, BsThreeDots } from 'react-icons/bs';
import { FcApproval, FcLike, FcPortraitMode, FcSms } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { timeForToday } from '../../store/commentDummy';
import { dummyData, IBlogData } from '../../store/dummy';
import CommunityFeedCommentForm from '../feedDetail/CommunityFeedCommentForm';

export default function CommunityQADetailAnswer() {
  const { id } = useParams();
  const data = dummyData.find((i) => i.id === Number(id)) as IBlogData;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center overflow-hidden rounded-[20px] border-[3px] border-pointGreen  dark:border-sky ">
      <div className="flex h-[55px] w-full items-center justify-between border-b-[0.5px] border-b-darkIvory  bg-midIvory p-5  text-[20px]  font-bold dark:border-b-lightNavy dark:bg-midNavy">
        <div className="flex items-center gap-2">
          <FcApproval size={24} />
          <span>답변 1</span>
        </div>
        <BsThreeDots className="text-[24px]" />
      </div>
      <div className="flex w-full flex-col gap-4 bg-midIvory p-4 py-8 dark:bg-midNavy">
        <div className="flex w-full">
          <div className="flex gap-1">
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/otherProfile/${data?.userName}`);
              }}
              className="w-[58px] cursor-pointer rounded-full"
              src={data?.img}
            />
            <div className="pl-3">
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">{data?.userName}</p>
                <BsDot />
                <p className="text-[17px] opacity-50">{timeForToday(data?.createdAt)}</p>
              </div>
              <div className="mt-1 text-[16px] opacity-50">프론트엔드 개발자</div>
            </div>
          </div>
          <div className="grow text-end font-bold">
            <div className="flex h-full items-center justify-end ">
              <div className="flex cursor-pointer gap-3">
                <FcPortraitMode />
                <p>팔로우</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-base">{data?.detail}</p>
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsCommentOpen(!isCommentOpen);
        }}
        className="flex h-[54px] w-full items-center gap-8 bg-[#a49c7c] p-4 text-base text-white dark:bg-[#383030] dark:dark:bg-[#2c2e34]"
      >
        <div className="flex cursor-pointer items-center gap-2">
          <FcLike size={'20px'} />
          {data?.likeCount}
        </div>
        <div className="flex cursor-pointer items-center gap-2">
          <FcSms size={'20px'} />
          {data?.commentCount}
        </div>
      </div>
      {isCommentOpen && (
        <div className="mt-4 w-full">
          <CommunityFeedCommentForm />
        </div>
      )}
    </div>
  );
}
