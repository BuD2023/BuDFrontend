import { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FcApproval, FcCheckmark, FcLike, FcPortraitMode, FcSms } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunityAnswerQuery, useDeleteQnaAnswerMutation, usePinAnswerMutation, usePostQnaAnswerLikeMutation } from '../../store/module/useCommunityDetailQuery';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import CommunityCommentForm from '../feedDetail/CommunityCommentForm';
import { CommunityQADetailAnswerProps, QnaAnswerContentType } from './_Q&ADetail.interface';
import { S3_URL } from '../../constant/union';
import { timeForToday } from '../../utils/timeForToday';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { getMyPageInfo } from '../../store/recoil/user';
import { answerEdit } from '../../store/recoil/answerEdit';
import ImagePeek from '../common/ImagePeek';
import PicModal from '../common/PicModal';

export default function CommunityQADetailAnswer({ isCommentOpen, setIsCommentOpen, answerPin, setAnswerPin, questionUserId }: CommunityQADetailAnswerProps) {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState<boolean>();
  const [activeComment, setActiveComment] = useState<number[]>([]);
  const [activeAnswerMenu, setActiveAnswerMenu] = useState<number[]>([]);

  // recoil
  const [_, setAnswerEditValue] = useRecoilState(answerEdit);

  // 사용자 정보
  const getMyPageInfoLodable = useRecoilValueLoadable(getMyPageInfo);
  const myPageInfo: any = 'hasValue' === getMyPageInfoLodable.state ? getMyPageInfoLodable.contents : {};

  const [userId, setUserId] = useState<number>();
  const [answerId, setAnswerId] = useState<number>();

  //리액트 쿼리
  const { data: answerData, isLoading: answerIsLoading, error: answerError, refetch } = useCommunityAnswerQuery(Number(postId));
  const { mutate: followMutate } = useFollowMutation(Number(userId), Number(postId));
  const { mutate: pinAnswerMutate } = usePinAnswerMutation(Number(answerId));
  const { mutate: likeAnswerMutate } = usePostQnaAnswerLikeMutation(Number(postId));
  const { mutate: deleteAnswerMutate } = useDeleteQnaAnswerMutation(Number(answerId), Number(postId));

  console.log(answerData?.content);

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  const handleClickFollow = (e: React.MouseEvent<HTMLElement>, memberId: number) => {
    setUserId(memberId);
    e.stopPropagation();
    followMutate();
  };

  const handleClickPinAnswer = (answerId: number) => {
    setAnswerId(answerId);
    pinAnswerMutate();
  };

  const handleClickDeleteAnswer = (answerId: number) => {
    setAnswerId(answerId);
    deleteAnswerMutate();
  };

  useEffect(() => {
    if (answerData?.content.some((answer: QnaAnswerContentType) => answer.qnaAnswerPin)) {
      setAnswerPin(true);
    } else {
      setAnswerPin(false);
    }
  }, [answerData]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      {answerData &&
        answerData?.content.map((answer: QnaAnswerContentType, idx: number) => {
          return (
            <div key={answer.id} className={'w-full overflow-hidden rounded-[20px] bg-midIvory dark:bg-midNavy ' + (answer.qnaAnswerPin ? 'border-4 border-pointGreen dark:border-sky ' : '')}>
              <div className="relative flex h-[55px] w-full items-center justify-between rounded-t-[20px] border-b border-b-darkIvory border-opacity-30 bg-midIvory p-5 text-[20px] font-bold dark:border-b-lightNavy dark:border-opacity-30 dark:bg-midNavy">
                <div className="flex items-center gap-2">
                  {answer.qnaAnswerPin && <FcApproval size={24} />}
                  <span>답변 {idx + 1}</span>
                </div>
                {!answerPin && (
                  <div className="flex items-center gap-4">
                    {myPageInfo.id === questionUserId && (
                      <span onClick={() => handleClickPinAnswer(answer.id)} className="cursor-pointer rounded-lg bg-pointGreen py-2 px-2.5 text-base text-white dark:bg-sky">
                        채택하기
                      </span>
                    )}
                    {myPageInfo.nickName === answer.member.nickname && (
                      <BsThreeDots
                        id={String(answer.id)}
                        className="cursor-pointer text-[24px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (Number(e.currentTarget.id) === answer.id) {
                            // answer 활성 메뉴 선택
                            if (activeAnswerMenu.includes(answer.id)) {
                              setActiveAnswerMenu(activeAnswerMenu.filter((id) => id !== answer.id));
                            } else {
                              setActiveAnswerMenu([...activeAnswerMenu, answer.id]);
                            }
                            setIsMenu(true);
                          }
                        }}
                      />
                    )}
                  </div>
                )}
                {isMenu && activeAnswerMenu.includes(answer.id) && (
                  <div className="absolute right-4 top-[45px] flex flex-col gap-3 rounded-xl bg-greyBeige p-3 text-[16px] font-medium">
                    <div
                      onClick={() => {
                        setAnswerEditValue({
                          content: answer.content,
                          images: [],
                        });
                        navigate(`/answerEdit/${postId}/${answer.id}`);
                      }}
                      className="cursor-pointer"
                    >
                      수정하기
                    </div>
                    <div onClick={() => handleClickDeleteAnswer(answer.id)} className="cursor-pointer">
                      삭제하기
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col gap-4 bg-midIvory p-4 py-8 dark:bg-midNavy">
                <div className="flex w-full">
                  <div className="flex gap-1">
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/otherProfile/${answer.member.id}/feed`);
                      }}
                      className="w-[58px] cursor-pointer rounded-full"
                      src={S3_URL + answer.member.profileImg}
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
                        {answer.follow ? (
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
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-base">{answer.content}</p>
                </div>
              </div>
              {answer?.imageUrls && answer?.imageUrls.length > 0 && answer?.imageUrls[0] !== 'https://budproject.s3.ap-northeast-2.amazonaws.com/null' && (
                <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={answer?.imageUrls.map((i) => S3_URL + i) as string[]} />
              )}
              <div
                className={
                  'flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#a49c7c] p-4 text-base text-white dark:bg-[#383030] dark:dark:bg-[#2c2e34] ' +
                  (answer.qnaAnswerPin ? '!rounded-none' : '')
                }
              >
                <div onClick={() => likeAnswerMutate(answer.id)} className="flex cursor-pointer items-center gap-2">
                  {answer.like ? <FcLike size="20px" /> : <FcLike className="opacity-50 brightness-[5]" size="20px" />}
                  {answer.likeCount}
                </div>
                <div
                  id={String(answer.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e.currentTarget.id, answer.id);
                    if (Number(e.currentTarget.id) === answer.id) {
                      // answer 활성 댓글 선택
                      if (activeComment.includes(answer.id)) {
                        setActiveComment(activeComment.filter((id) => id !== answer.id));
                      } else {
                        setActiveComment([...activeComment, answer.id]);
                      }
                      setIsCommentOpen(true);
                    }
                  }}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <FcSms size={'20px'} />
                  {answer.commentCount}
                </div>
              </div>
              {isCommentOpen && activeComment.includes(answer.id) && (
                <div className="mt-4 w-full">
                  <CommunityCommentForm type="QNA" answerId={answer.id} questionUserId={answer.member.id} />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
