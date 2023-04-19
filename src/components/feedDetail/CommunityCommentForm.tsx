import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { useEffect, useState } from 'react';
import { BsDot, BsFillPinAngleFill, BsFillTrashFill, BsHeartFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import profile2 from '../../assets/profile2.jpeg';
import {
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
} from '../../store/module/useCommunityDetailQuery';
import { CommunityCommentType } from '../community/_Community.interface';

interface CommunityFeedCommentFormProps {
  type: string;
  answerId?: number;
}

export default function CommunityCommentForm({ type, answerId }: CommunityFeedCommentFormProps) {
  const { id: postId } = useParams();
  const [commentId, setCommentId] = useState(0);
  const navigate = useNavigate();
  const userNickname = 'JHni2';

  const { data: feedData, isLoading: feedIsLoading, error: feedError, refetch: feedRefetch } = useFeedCommentQuery(Number(postId));
  const { data: QnAData, isLoading: QnAIsLoading, error: QnAError, refetch: qnaRefetch } = useQnACommentQuery(Number(answerId));
  const { mutate: deleteFeedCommentMutate } = useDeleteFeedCommentMutation(commentId);
  const { mutate: deleteQnaCommentMutate } = useDeleteQnACommentMutation(commentId);
  const { mutate: deleteFeedCommentPinMutate } = useDeleteFeedCommentPinMutation(Number(postId));
  const { mutate: deleteQnaCommentPinMutate } = useDeleteQnACommentPinMutation(Number(postId));
  const { mutate: feedCommentPinMutate } = useFeedCommentPinMutation(commentId, Number(postId));
  const { mutate: qnaCommentPinMutate } = useQnACommentPinMutation(commentId);
  const { mutate: feedCommentLikeMutate } = useFeedCommentLikeMutation(commentId, Number(postId));
  const { mutate: qnaCommentLikeMutate } = useQnACommentLikeMutation(commentId, Number(answerId));
  const [message, setMessage] = useState<string>('');

  const data = type === 'FEED' ? feedData : QnAData;

  const pressEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing) return;
      event.preventDefault();
      console.log('댓글 입력 완료 ^^');
    }
  };

  const handleClickLike = (commentId: number, memberName: string) => {
    setCommentId(commentId);

    if (type === 'FEED') {
      feedCommentLikeMutate();
    } else {
      qnaCommentLikeMutate();
    }
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

  if (feedError || QnAError) {
    return <NotFound />;
  }

  useEffect(() => {
    if (type === 'FEED') {
      feedRefetch();
      return;
    } else {
      qnaRefetch();
    }
  }, []);

  return (
    <div className="flex min-h-[170px] w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex h-[55px] w-full items-center border-b border-b-darkIvory border-opacity-30 p-5 text-[20px] font-bold dark:border-darkNavy dark:border-b-lightNavy dark:border-opacity-30">
        <div>댓글</div>
        <div className="ml-2 text-[18px] font-bold opacity-50">{data?.pages.flatMap((comment) => comment.numberOfElements)}</div>
      </div>
      <SwipeableList>
        {() => (
          <div className={'flex w-full flex-col gap-4 py-4'}>
            {data?.pages.flatMap((comment: CommunityCommentType) =>
              comment.content.map((content) => {
                return (
                  <SwipeableListItem
                    key={content.commentId}
                    swipeLeft={{
                      content: (
                        <div className="flex h-full w-full items-center justify-end bg-[#ff5232] p-4 text-white dark:bg-[#a51b0b]">
                          <span className="flex items-center gap-2 text-lg">
                            삭제
                            <BsFillTrashFill />
                          </span>
                        </div>
                      ),
                      action: () => {
                        console.log('Deleting item:', content.commentId);
                        setCommentId(content.commentId);
                        if (type === 'FEED') {
                          deleteFeedCommentMutate();
                        } else {
                          deleteQnaCommentMutate();
                        }
                      },
                    }}
                    swipeRight={{
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
                          }
                        }
                        if (type === 'FEED') {
                          feedCommentPinMutate();
                        } else {
                          qnaCommentPinMutate();
                        }
                      },
                    }}
                  >
                    <li key={content.commentId} className="flex min-h-[60px] w-full gap-2 bg-midIvory px-4 dark:bg-midNavy">
                      {/* {comment.isRef && <BsArrowReturnRight className="ml-4 text-[20px]" />} */}
                      <img
                        onClick={() => (content.memberName === userNickname ? navigate(`/myProfile`) : navigate(`/otherProfile/${content.memberId}`))}
                        src={content.memberProfileUrl ?? profile2}
                        className="h-[50px] w-[50px] shrink-0 cursor-pointer rounded-full object-cover"
                      />
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
                          <div className="text-[15px]">{content.content}</div>
                          <div onClick={() => handleClickLike(content.commentId, content.memberName)} className="flex items-center justify-center gap-1">
                            {content.isReaderLiked ? <BsHeartFill className="cursor-pointer text-[#f44336]" /> : <BsHeartFill className="cursor-pointer text-white" />}
                            <span className="text-[13px]">{content.numberOfLikes}</span>
                          </div>
                        </div>
                        <div>
                          <span className="cursor-pointer text-[14px] opacity-60">답글 달기</span>
                        </div>
                      </div>
                    </li>
                  </SwipeableListItem>
                );
              })
            )}
          </div>
        )}
      </SwipeableList>
      <div className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-start gap-4 bg-lightIvory p-3 dark:bg-darkNavy">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={pressEnterKey}
          type="text"
          className="mb-0.5 h-[40px] w-full grow rounded-[20px] bg-greyBeige px-4 py-2 focus:outline-none dark:bg-lightNavy"
        />
      </div>
    </div>
  );
}