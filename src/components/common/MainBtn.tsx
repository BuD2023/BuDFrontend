import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllChatroomQuery, useCreateRoomMutation } from '../../store/module/useCoffeeChatQuery';
import { useCommunityAnswerQuery, useCreateAnswerMutation, useUpdateAnswerMutation } from '../../store/module/useCommunityDetailQuery';
import { useCommunityPostQuery, usePostCommunityMutation, useUpdateCommunityMutation } from '../../store/module/useCommunityQuery';
import { toFormData } from '../../utils/toFormData';
import { postingInfoType } from '../community/_Community.interface';
import { MainBtnPropsType } from './_Common.interface';

export default function MainBtn({ onSubmit, content, size }: MainBtnPropsType) {
  const navigate = useNavigate();

  const [postId, setPostId] = useState<number>(0);
  //reactQuery - mutation
  const { mutateAsync: mutateCreateRoom } = useCreateRoomMutation();
  const { mutateAsync: mutateCreatePost } = usePostCommunityMutation();
  const { mutateAsync: mutateUpdatePost } = useUpdateCommunityMutation(postId);
  const { mutateAsync: mutateCreateQnaAnswer } = useCreateAnswerMutation();
  const { mutateAsync: mutateUpdateQnaAnswer } = useUpdateAnswerMutation(postId);
  const { refetch: allChatroomRefetch } = useAllChatroomQuery();
  const { refetch: communityPostRefetch } = useCommunityPostQuery();
  const { refetch: communityAnswerRefetch } = useCommunityAnswerQuery(postId);

  const handleSubitData = async () => {
    console.log(onSubmit);
    switch (onSubmit?.postTypeInfo) {
      case 'ROOM_CREATE':
        // 해쉬태그가 있다면
        if (onSubmit.hashTag && onSubmit?.hashTag.join('').length > 0) {
          await mutateCreateRoom({
            title: onSubmit.title as string,
            description: onSubmit.description as string,
            hashTag: onSubmit.hashTag as string[],
          });
          console.log('Chatroom : Hashtag Contained');
        }
        // 해쉬태그가 없다면
        else {
          await mutateCreateRoom({
            title: onSubmit.title as string,
            description: onSubmit.description as string,
          });
          console.log('Chatroom : No Hashtag');
        }
        await allChatroomRefetch();
        navigate('/coffeeChat');
        break;
      case 'POST_UPDATE':
        setPostId(onSubmit.postId as number);
        // 게시글 업데이트 이미지 없음
        if (onSubmit.images && (onSubmit.images === null || onSubmit.images.length === 0)) {
          await mutateUpdatePost(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              postId: onSubmit.postId as number,
              title: onSubmit.title as string,
              content: onSubmit.content as string,
              postType: onSubmit.postType as string,
            })
          );
          console.log('Post Update : No Image');
          // 게시글 업데이트 이미지 있음
        } else {
          await mutateUpdatePost(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              postId: onSubmit.postId as number,
              title: onSubmit.title as string,
              content: onSubmit.content as string,
              postType: onSubmit.postType as string,
              images: onSubmit.images,
            })
          );
          console.log('Post Update : Image contained');
        }
        await communityPostRefetch();
        navigate('/community/all');
        break;
      case 'POST_CREATE':
        // 게시글 생성 이미지 없음
        if (onSubmit.images === null) {
          await mutateCreatePost(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              title: onSubmit.title as string,
              content: onSubmit.content as string,
              postType: onSubmit.postType as string,
            })
          );
          console.log('Post Create : No Image');
          // 게시글 생성 이미지 있음
        } else {
          await mutateCreatePost(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              title: onSubmit.title as string,
              content: onSubmit.content as string,
              postType: onSubmit.postType as string,
              images: onSubmit.images,
            })
          );
          console.log('Post Create : Image contained');
        }
        await communityPostRefetch();
        navigate('/community/all');
        break;
      case 'ANSWER_CREATE':
        setPostId(onSubmit.postId as number);
        // 답변생성 이미지 없음
        if (onSubmit.images && onSubmit.images.length === 0) {
          await mutateCreateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              postId: String(onSubmit.postId),
              content: onSubmit.content as string,
            })
          );
          console.log('Create Answer : No Image');
          // 답변생성 이미지 있음
        } else {
          await mutateCreateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              postId: String(onSubmit.postId),
              content: onSubmit.content as string,
              images: onSubmit.images,
            })
          );
          console.log('Create Answer : Image Contained');
        }
        await communityAnswerRefetch();
        navigate(`/communityQADetail/${onSubmit.postId}`);
        break;
      case 'ANSWER_UPDATE':
        setPostId(onSubmit.qnaAnswerId as number);
        // 답변 업데이트 이미지 없음
        if (onSubmit.images && onSubmit.images.length === 0) {
          await mutateUpdateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              content: onSubmit.content as string,
            })
          );
          console.log('Update Answer : No Image');
          // 답변 업데이트 이미지 있음
        } else {
          await mutateUpdateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              content: onSubmit.content as string,
              images: onSubmit.images,
            })
          );
          console.log('Update Answer : Image Contained');
        }
        await communityAnswerRefetch();
        navigate(`/communityQADetail/${onSubmit.postId}`);
        break;
      default:
        console.log(onSubmit);
        break;
    }
  };

  return (
    <button
      disabled={(onSubmit?.title?.trim().length === 0 || onSubmit?.description?.trim().length === 0 || onSubmit?.content?.trim().length === 0) as boolean}
      onClick={handleSubitData}
      className={'flex cursor-pointer justify-center rounded-[50px] bg-greyBeige disabled:opacity-40 dark:bg-sky ' + `text-[${size}px]`}
    >
      <span className="px-5 py-2 font-bold">{content}</span>
    </button>
  );
}
