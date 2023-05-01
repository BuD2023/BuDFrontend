import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { useEffect, useRef, useState } from 'react';
import { BsArrowReturnRight, BsDot, BsFillPinAngleFill, BsFillTrashFill, BsHeartFill, BsX } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { S3_URL } from '../../constant/union';
import {
  useFeedCommentMutation,
  useFeedCommentReplyMutation,
  useDeleteFeedCommentMutation,
  useDeleteFeedCommentPinMutation,
  useDeleteQnACommentMutation,
  useDeleteQnACommentPinMutation,
  useFeedCommentLikeMutation,
  useFeedCommentPinMutation,
  useFeedCommentQuery,
  useQnACommentLikeMutation,
  useQnACommentPinMutation,
  useQnACommentQuery,
  useQnaCommentMutation,
  useQnaCommentReplyMutation,
} from '../../store/module/useCommunityDetailQuery';
import { loginUserInfo } from '../../store/recoil/user';
import LazyLoadImage from '../../utils/LazyLoadImage';
import { CommunityCommentType } from '../community/_Community.interface';
import { CommunityFeedCommentFormPropsType } from './_FeedDetail.interface';

export default function CommunityCommentForm({ type, answerId, questionUserId, commentCount, refetch }: CommunityFeedCommentFormPropsType) {
  const { id: postId } = useParams();
  const [commentId, setCommentId] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isCommentReply, setIsCommentReply] = useState<boolean>(false);
  const [commentReplyNickname, setCommentReplyNickname] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // 사용자 정보 Recoil
  const logInUserInfo = useRecoilValue(loginUserInfo);

  const { data: feedData, isLoading: feedIsLoading, error: feedError, refetch: feedCommentRefetch } = useFeedCommentQuery(Number(postId));
  const { data: QnAData, isLoading: QnAIsLoading, error: QnAError, refetch: qnaCommentRefetch } = useQnACommentQuery(Number(answerId));
  const { mutateAsync: deleteFeedCommentMutateAsync } = useDeleteFeedCommentMutation(commentId, Number(postId));
  const { mutateAsync: deleteQnaCommentMutateAysnc } = useDeleteQnACommentMutation(commentId, Number(answerId));
  const { mutate: deleteFeedCommentPinMutate } = useDeleteFeedCommentPinMutation(Number(postId));
  const { mutate: deleteQnaCommentPinMutate } = useDeleteQnACommentPinMutation(Number(answerId));
  const { mutate: feedCommentPinMutate } = useFeedCommentPinMutation(commentId, Number(postId));
  const { mutate: qnaCommentPinMutate } = useQnACommentPinMutation(commentId, Number(answerId));
  const { mutate: feedCommentLikeMutate } = useFeedCommentLikeMutation(commentId, Number(postId));
  const { mutate: qnaCommentLikeMutate } = useQnACommentLikeMutation(commentId, Number(answerId));
  const { mutateAsync: feedCommentMutateAsync } = useFeedCommentMutation(Number(postId));
  const { mutateAsync: qnaCommentMutateAsync } = useQnaCommentMutation(Number(answerId));
  const { mutateAsync: feedCommentReplyMutateAsync } = useFeedCommentReplyMutation(Number(commentId));
  const { mutateAsync: qnaCommentReplyMutateAsync } = useQnaCommentReplyMutation(Number(commentId));

  const data = type === 'FEED' ? feedData : QnAData;

  const scrollToBottom = (refetch: any) => {
    Promise.all([refetch()]).then(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const pressEnterKey = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing) return;
      event.preventDefault();
      setComment('');
      inputRef.current?.blur();

      if (type === 'FEED') {
        if (isCommentReply) {
          await feedCommentReplyMutateAsync(comment);
        } else {
          await feedCommentMutateAsync(comment);
        }
      } else if (type === 'QNA') {
        if (isCommentReply) {
          await qnaCommentReplyMutateAsync(comment);
        } else {
          await qnaCommentMutateAsync(comment);
        }
      }

      if (type === 'FEED') {
        refetch();
        feedCommentRefetch();
      } else {
        qnaCommentRefetch();
        refetch();
      }
    }
  };

  const handleClickLike = (commentId: number) => {
    setCommentId(commentId);
    if (type === 'FEED') {
      feedCommentLikeMutate();
    } else {
      qnaCommentLikeMutate();
    }
  };

  const handleClickCommentReply = (commentId: number, commentReplyNickname: string) => {
    setIsCommentReply(true);
    setCommentId(commentId);
    setCommentReplyNickname(commentReplyNickname);
  };

  // data?.pages.flatMap((comment: CommunityCommentType) =>
  //   comment.content.map((content) => {
  //     console.log(content);
  //   })
  // );

  // if (feedIsLoading) {
  //   return (
  //     <div className="flex min-h-[170px] w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
  //       <div className="flex h-[55px] w-full items-center border-b border-b-darkIvory border-opacity-30 p-5 text-[20px] font-bold dark:border-darkNavy dark:border-b-lightNavy dark:border-opacity-30"></div>
  //       <div className="h-[108px] w-full"></div>
  //       <div className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-start gap-4 bg-lightIvory p-3 dark:bg-darkNavy">
  //         <input
  //           value={message}
  //           onChange={(e) => setMessage(e.target.value)}
  //           onKeyDown={pressEnterKey}
  //           type="text"
  //           className="mb-0.5 h-[40px] w-full grow rounded-[20px] bg-greyBeige px-4 py-2 focus:outline-none dark:bg-lightNavy"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  // if (feedError || QnAError) {
  //   navigate('/NotFound');
  // }

  useEffect(() => {
    if (type === 'FEED') {
      feedCommentRefetch();
      return;
    } else {
      qnaCommentRefetch();
      return;
    }
  }, []);

  return (
    <div className="flex min-h-[170px] w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex h-[55px] w-full items-center border-b border-b-darkIvory border-opacity-30 p-5 text-[20px] font-bold dark:border-darkNavy dark:border-b-lightNavy dark:border-opacity-30">
        <div>댓글</div>
        <div className="ml-2 text-[18px] font-bold opacity-50">{commentCount}</div>
      </div>
      <SwipeableList>
        {() => (
          <div className={'flex w-full flex-col gap-4 py-4'}>
            {data?.pages.flatMap((comment: CommunityCommentType) =>
              comment.content.map((content) => {
                return (
                  <div key={content.commentId} className="flex flex-col gap-4">
                    <SwipeableListItem
                      swipeLeft={
                        content.memberId === logInUserInfo?.id
                          ? {
                              content: (
                                <div className="flex h-full w-full items-center justify-end bg-[#ff5232] p-4 text-white dark:bg-[#a51b0b]">
                                  <span className="flex items-center gap-2 text-lg">
                                    삭제
                                    <BsFillTrashFill />
                                  </span>
                                </div>
                              ),
                              action: async () => {
                                console.log('Deleting item:', content.commentId);
                                setCommentId(content.commentId);
                                if (type === 'FEED') {
                                  await deleteFeedCommentMutateAsync();
                                  refetch();
                                } else {
                                  await deleteQnaCommentMutateAysnc();
                                  refetch();
                                }
                              },
                            }
                          : undefined
                      }
                      swipeRight={
                        questionUserId === logInUserInfo?.id
                          ? {
                              content: (
                                <div className="flex h-full w-full items-center justify-start bg-pointGreen p-4 text-white dark:bg-pointGreen">
                                  <span className="flex items-center gap-2 text-lg">
                                    고정하기
                                    <BsFillPinAngleFill />
                                  </span>
                                </div>
                              ),
                              action: () => {
                                console.log('Pin item:', content.commentId);
                                setCommentId(content.commentId);
                                if (content.isPinned) {
                                  if (type === 'FEED') {
                                    deleteFeedCommentPinMutate();
                                    return;
                                  } else {
                                    deleteQnaCommentPinMutate();
                                    return;
                                  }
                                }
                                if (type === 'FEED') {
                                  feedCommentPinMutate();
                                } else {
                                  qnaCommentPinMutate();
                                }
                              },
                            }
                          : undefined
                      }
                    >
                      <li className="flex min-h-[60px] w-full gap-2 bg-midIvory px-4 dark:bg-midNavy">
                        <LazyLoadImage
                          onClick={() => (content.memberId === logInUserInfo?.id ? navigate(`/myProfile/feed`) : navigate(`/otherProfile/${content.memberId}/feed`))}
                          src={S3_URL + content.memberProfileUrl}
                          alt={content.memberName}
                          className="h-[50px] w-[50px] shrink-0 cursor-pointer rounded-full object-cover"
                        ></LazyLoadImage>
                        <div className="flex h-full w-full flex-col justify-between gap-1">
                          <div className="flex w-full justify-between">
                            <div className="flex items-center gap-1">
                              <div className="text-[15px] font-semibold">{content.memberName}</div>
                              <BsDot className="opacity-70" />
                              <div className="mr-2 text-[14px] opacity-70">{content.createdAt}</div>
                              {content.isPinned && (
                                <div className="itmes-center flex justify-center gap-1 rounded-2xl bg-greyBeige px-[5px] py-1 text-[14px] dark:bg-sky">
                                  <BsFillPinAngleFill />
                                  고정됨
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-[15px]">{content.content.replaceAll('"', '')}</div>
                            <div onClick={() => handleClickLike(content.commentId)} className="flex cursor-pointer items-center justify-center gap-1">
                              {content.isReaderLiked ? <BsHeartFill className="text-[#f44336]" /> : <BsHeartFill className="text-white opacity-50" />}
                              <span className="text-[13px]">{content.numberOfLikes}</span>
                            </div>
                          </div>
                          <div>
                            <span onClick={() => handleClickCommentReply(content.commentId, content.memberName)} className="cursor-pointer text-[14px] opacity-60">
                              답글 달기
                            </span>
                          </div>
                        </div>
                      </li>
                    </SwipeableListItem>
                    {content.reComments.length > 0 &&
                      content.reComments.map((reComment: any) => (
                        <SwipeableListItem
                          key={reComment.commentId}
                          swipeLeft={
                            reComment.memberId === logInUserInfo?.id
                              ? {
                                  content: (
                                    <div className="flex h-full w-full items-center justify-end bg-[#ff5232] p-4 text-white dark:bg-[#a51b0b]">
                                      <span className="flex items-center gap-2 text-lg">
                                        삭제
                                        <BsFillTrashFill />
                                      </span>
                                    </div>
                                  ),
                                  action: async () => {
                                    console.log('Deleting item:', reComment.commentId);
                                    setCommentId(reComment.commentId);
                                    if (type === 'FEED') {
                                      await deleteFeedCommentMutateAsync();
                                      refetch();
                                    } else {
                                      await deleteQnaCommentMutateAysnc();
                                      refetch();
                                    }
                                  },
                                }
                              : undefined
                          }
                        >
                          <div key={reComment.commentId} className="flex w-full pl-8">
                            <BsArrowReturnRight className="relative top-[10px] text-lightText opacity-60 dark:text-white" size={25} />
                            <li className="flex min-h-[60px] w-full list-none gap-2 bg-midIvory px-4 dark:bg-midNavy">
                              <LazyLoadImage
                                onClick={() => (reComment.memberId === logInUserInfo?.id ? navigate(`/myProfile/feed`) : navigate(`/otherProfile/${content.memberId}/feed`))}
                                src={S3_URL + (reComment.memberProfileUrl ?? 'file/2023-04-25/d85de5cdbbdd440a9874020d3b250d5d_20230425205043366.jpeg')}
                                alt={reComment.memberName}
                                className="h-[50px] w-[50px] shrink-0 cursor-pointer rounded-full object-cover"
                              ></LazyLoadImage>
                              <div className="flex h-full w-full flex-col gap-1">
                                <div className="flex w-full justify-between">
                                  <div className="flex items-center gap-1">
                                    <div className="text-[15px] font-semibold">{reComment.memberName}</div>
                                    <BsDot className="opacity-70" />
                                    <div className="mr-2 text-[14px] opacity-70">{reComment.createdAt}</div>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="text-[15px]">{reComment.content?.replaceAll('"', '')}</div>
                                  <div onClick={() => handleClickLike(reComment.commentId)} className="flex cursor-pointer items-center justify-center gap-1">
                                    {reComment.isReaderLiked ? <BsHeartFill className="text-[#f44336]" /> : <BsHeartFill className="text-white opacity-50" />}
                                    <span className="text-[13px]">{reComment.numberOfLikes}</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </div>
                        </SwipeableListItem>
                      ))}
                  </div>
                );
              })
            )}
          </div>
        )}
      </SwipeableList>
      <div className="fixed bottom-0 left-0 z-20 w-full items-center justify-start gap-4 bg-lightIvory p-3 dark:bg-darkNavy">
        {isCommentReply && (
          <div className="flex justify-between px-1 pb-3 pt-1 text-sm tracking-wider text-lightText opacity-50 dark:text-white">
            {commentReplyNickname}님에게 답글 남기는 중
            <BsX onClick={() => setIsCommentReply(false)} size={20} className="cursor-pointer" />
          </div>
        )}
        <input
          ref={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={pressEnterKey}
          type="text"
          className="mb-0.5 h-[40px] w-full grow rounded-[20px] bg-greyBeige px-4 py-2 focus:outline-none dark:bg-lightNavy"
        />
      </div>
    </div>
  );
}
