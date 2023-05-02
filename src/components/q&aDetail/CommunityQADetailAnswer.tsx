import { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FcApproval, FcCheckmark, FcLike, FcPortraitMode, FcSms } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunityAnswerQuery, useCommunityDetailQuery, useDeleteQnaAnswerMutation, usePinAnswerMutation, usePostQnaAnswerLikeMutation } from '../../store/module/useCommunityDetailQuery';
import { useFollowMutation } from '../../store/module/useCommunityQuery';
import CommunityCommentForm from '../feedDetail/CommunityCommentForm';
import { CommunityQADetailAnswerProps, QnaAnswerContentType } from './_Q&ADetail.interface';
import { S3_URL } from '../../constant/union';
import { timeForToday } from '../../utils/timeForToday';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginUserInfo } from '../../store/recoil/user';
import { answerEdit } from '../../store/recoil/answerEdit';
import ImagePeek from '../common/ImagePeek';
import PicModal from '../common/PicModal';
import LazyLoadImage from '../../utils/LazyLoadImage';
import ConfirmModal from '../common/ConfirmModal';

export default function CommunityQADetailAnswer({ isCommentOpen, setIsCommentOpen, answerPin, setAnswerPin, questionUserId, setIsActiveComment }: CommunityQADetailAnswerProps) {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState<boolean>();
  const [activeComment, setActiveComment] = useState<number[]>([]);
  const [activeAnswerMenu, setActiveAnswerMenu] = useState<number[]>([]);
  const [isPinAnswer, setIsPinAnswer] = useState<boolean>(false);
  const getModalAnswer = () => {};
  const withdrawalText = '답변 채택 시 질문과 답변의 수정, 삭제 및 \n해당 질문에 대한 추가 답변 작성이 불가합니다.\n정말 답변을 채택하시겠습니까?';

  // recoil
  const [_, setAnswerEditValue] = useRecoilState(answerEdit);
  // 사용자 정보
  const logInUserInfo = useRecoilValue(loginUserInfo);

  const [userId, setUserId] = useState<number>();
  const [answerId, setAnswerId] = useState<number>();

  //리액트 쿼리
  const { data: answerData, refetch: answerRefetch } = useCommunityAnswerQuery(Number(postId));
  const { refetch: detailRefetch } = useCommunityDetailQuery(Number(postId));

  const { mutate: followMutate } = useFollowMutation(Number(userId), Number(postId));
  const { mutateAsync: pinAnswerMutateAsync } = usePinAnswerMutation(Number(answerId));
  const { mutate: likeAnswerMutate } = usePostQnaAnswerLikeMutation(Number(postId));
  const { mutateAsync: deleteAnswerMutate } = useDeleteQnaAnswerMutation(Number(answerId), Number(postId));

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

  const handleClickPinAnswer = async (answerId: number) => {
    setAnswerId(answerId);
    await pinAnswerMutateAsync();
    answerRefetch();
  };

  const handleClickDeleteAnswer = async (answerId: number) => {
    setAnswerId(answerId);
    await deleteAnswerMutate();
    detailRefetch();
  };

  useEffect(() => {
    if (answerData?.content.some((answer: QnaAnswerContentType) => answer.qnaAnswerPin)) {
      setAnswerPin(true);
    } else {
      setAnswerPin(false);
    }
  }, [answerData]);

  useEffect(() => {
    answerRefetch();
  }, []);

  useEffect(() => {
    if (setIsActiveComment) {
      if (activeComment.length > 0) {
        setIsActiveComment(true);
      } else {
        setIsActiveComment(false);
      }
    }
  }, [activeComment]);

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      {answerData &&
        answerData?.content.map((answer: QnaAnswerContentType, idx: number) => {
          return (
            <div key={answer.id} className={'w-full overflow-hidden rounded-[20px] bg-midIvory dark:bg-midNavy ' + (answer.qnaAnswerPin ? 'border-4 border-pointGreen dark:border-sky ' : '')}>
              <ConfirmModal
                action={() => handleClickPinAnswer(answer.id)}
                confirmModal={isPinAnswer}
                setConfirmModal={setIsPinAnswer}
                getModalAnswer={getModalAnswer}
                title="답변 채택"
                des={withdrawalText}
                confirmBtn="채택하기"
              />

              <div className="relative flex h-[55px] w-full items-center justify-between rounded-t-[20px] border-b border-b-darkIvory border-opacity-30 bg-midIvory p-5 text-[20px] font-bold dark:border-b-lightNavy dark:border-opacity-30 dark:bg-midNavy">
                <div className="flex items-center gap-2">
                  {answer.qnaAnswerPin && <FcApproval size={24} />}
                  <span>답변 {idx + 1}</span>
                </div>
                {!answerPin && (
                  <div className="flex items-center gap-4">
                    {logInUserInfo?.id === questionUserId && (
                      <span onClick={() => setIsPinAnswer(true)} className="cursor-pointer rounded-lg bg-pointGreen py-2 px-2.5 text-base text-white dark:bg-sky">
                        채택하기
                      </span>
                    )}
                    {logInUserInfo?.id === answer.member.id && (
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
                          images: answer.imageUrls,
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
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-1">
                    <LazyLoadImage
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/otherProfile/${answer.member.id}/feed`);
                      }}
                      className="aspect-square h-[58px] w-[58px] cursor-pointer rounded-full object-cover"
                      src={S3_URL + answer.member.profileImg}
                      alt={answer.member.nickname}
                    />
                    <div className="pl-3">
                      <div className="flex flex-col gap-1">
                        <p
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/otherProfile/${answer.member.id}/feed`);
                          }}
                          className="cursor-pointer text-xl font-bold"
                        >
                          {answer.member.nickname}
                        </p>
                        <p className="text-[17px] opacity-50">{timeForToday(answer.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  {answer.member.id !== logInUserInfo?.id && answer.member.status !== 'WITHDREW' && (
                    <div className="text-end font-bold">
                      <div onClick={(e) => handleClickFollow(e, answer.member.id)} className="flex h-full items-center justify-end ">
                        <div className="flex cursor-pointer gap-3 whitespace-nowrap">
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
                  )}
                </div>
                <div className="w-full">
                  <p className="text-base">{answer.content}</p>
                </div>
              </div>
              {answer?.imageUrls && answer?.imageUrls.length > 0 && answer?.imageUrls[0] !== 'https://budproject.s3.ap-northeast-2.amazonaws.com/null' && (
                <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={answer?.imageUrls.map((i) => S3_URL + i) as string[]} />
              )}
              <div className={'mt-4 flex h-[54px] w-full items-center gap-8 rounded-b-[20px] bg-[#a49c7c] p-4 text-base text-white dark:bg-[#383030] ' + (answer.qnaAnswerPin ? '!rounded-none' : '')}>
                <div onClick={() => likeAnswerMutate(answer.id)} className="flex cursor-pointer items-center gap-2">
                  {answer.like ? <FcLike size="20px" /> : <FcLike className="opacity-50 brightness-[5]" size="20px" />}
                  {answer.likeCount}
                </div>
                <div
                  id={String(answer.id)}
                  onClick={(e) => {
                    e.stopPropagation();
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
                  <CommunityCommentForm refetch={answerRefetch} commentCount={answer.commentCount} type="QNA" answerId={answer.id} questionUserId={answer.member.id} />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
