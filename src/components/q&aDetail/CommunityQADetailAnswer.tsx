import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FcApproval, FcLike, FcPortraitMode, FcSms } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { timeForToday } from '../../store/commentDummy';
import { useCommunityAnswerQuery } from '../../store/module/useCommunityDetailQuery';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import CommunityCommentForm from '../feedDetail/CommunityCommentForm';
import profile1 from '../../assets/profile1.jpg';

interface CommunityQADetailAnswerProps {
  isCommentOpen: boolean;
  setIsCommentOpen: (x: boolean) => void;
}

export default function CommunityQADetailAnswer({ isCommentOpen, setIsCommentOpen }: CommunityQADetailAnswerProps) {
  const { id: questionId } = useParams();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState<boolean>();

  const [userId, setUserId] = useState(0);
  const { mutate } = useFollowMutation(Number(userId));

  const handleClickFollow = (e: React.MouseEvent<HTMLElement>, memberId: number) => {
    setUserId(memberId);
    e.stopPropagation();
    mutate();
  };

  const { data: answerData, isLoading: answerIsLoading, error: answerError } = useCommunityAnswerQuery(Number(questionId));
  // answerData?.content.map((answer) => console.log(item));

  return (
    <>
      {answerData?.content.map((answer: any, idx: number) => {
        return (
          <div key={answer.id} className="w-full">
            <div className="relative flex h-[55px] w-full items-center justify-between rounded-t-[20px] border-b border-b-darkIvory border-opacity-30 bg-midIvory p-5 text-[20px] font-bold dark:border-b-lightNavy dark:border-opacity-30 dark:bg-midNavy">
              <div className="flex items-center gap-2">
                {answer.qnaAnswerPin && <FcApproval size={24} />}
                <span>답변 {idx + 1}</span>
              </div>
              <BsThreeDots
                className="cursor-pointer text-[24px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenu(!isMenu);
                }}
              />
              {isMenu && (
                <div className="absolute right-4 top-[45px] flex flex-col gap-3 rounded-xl bg-greyBeige p-3 text-[16px] font-medium">
                  <div onClick={() => navigate(`/answerEdit/${questionId}/1`)} className="cursor-pointer">
                    수정하기
                  </div>
                  <div className="cursor-pointer">삭제하기</div>
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-4 bg-midIvory p-4 py-8 dark:bg-midNavy">
              <div className="flex w-full">
                <div className="flex gap-1">
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/otherProfile/${answer.member.nickname}`);
                    }}
                    className="w-[58px] cursor-pointer rounded-full"
                    src={answer.member.profileImg ?? profile1}
                  />
                  <div className="pl-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-bold">{answer.member.nickname}</p>
                      <p className="text-[17px] opacity-50">{timeForToday(answer.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-end grow font-bold">
                  <div onClick={(e) => handleClickFollow(e, answer.member.id)} className="flex h-full items-center justify-end ">
                    <div className="flex cursor-pointer gap-3">
                      <FcPortraitMode />
                      <p>팔로우</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <p className="text-base">{answer.content}</p>
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsCommentOpen(!isCommentOpen);
              }}
              className="flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#a49c7c] p-4 text-base text-white dark:bg-[#383030] dark:dark:bg-[#2c2e34]"
            >
              <div className="flex cursor-pointer items-center gap-2">
                <FcLike size={'20px'} />
                {answer.likeCount}
              </div>
              <div className="flex cursor-pointer items-center gap-2">
                <FcSms size={'20px'} />
                {answer.commentCount}
              </div>
            </div>
            {isCommentOpen && (
              <div className="mt-4 w-full">
                <CommunityCommentForm type="QNA" answerId={answer.id} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
