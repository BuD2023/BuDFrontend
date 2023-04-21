import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateRoomMutation } from '../../store/module/useCoffeeChatQuery';
import { useCreateAnswerMutation } from '../../store/module/useCommunityDetailQuery';
import { usePostCommunityMutation, useUpdateCommunityMutation } from '../../store/module/useCommunityQuery';
import { postingInfoType } from '../community/_Community.interface';
import { MainBtnPropsType, OnSubmitType } from './_Common.interface';

export default function MainBtn({ onSubmit, content, size }: MainBtnPropsType) {
  const navigate = useNavigate();

  const [postId, setPostId] = useState<number>(0);
  //reactQuery - mutation
  const { mutate: mutateCreateRoom, isSuccess: roomSuccess } = useCreateRoomMutation();
  const { mutate: mutateCreatePost, isSuccess: postCreateSuccess } = usePostCommunityMutation();
  const { mutate: mutateUpdatePost, isSuccess: postUpdateSuccess } = useUpdateCommunityMutation(postId);
  const { mutate: mutateCreateQnaAnswer, isSuccess: qnaAnswerSuccess } = useCreateAnswerMutation();

  function toFormData(obj: Partial<OnSubmitType>) {
    const formData = new FormData();
    const { images, postTypeInfo, ...rest } = obj;
    const blob = new Blob([JSON.stringify(rest)], { type: 'application/json' });
    if (postTypeInfo === 'POST_CREATE') formData.append('createPostRequest', blob);
    if (postTypeInfo === 'POST_UPDATE') formData.append('updatePostRequest', blob);
    if (postTypeInfo === 'ANSWER_CREATE') formData.append('createQnaAnswerRequest', blob);
    if (postTypeInfo === 'ANSWER_UPDATE') formData.append('updateQnaAnswerRequest', blob);
    if (images) {
      console.log(images);
      Object.values(images).forEach((blob, i) => {
        let imgType;
        let type;
        let name = `BudImg(${Date.now()}${Math.random()})`;
        switch (images[i].type) {
          case 'image/png':
            imgType = 'image/png';
            type = '.png';
            break;
          case 'image/webp':
            imgType = 'image/webp';
            break;
          default:
            imgType = 'image/jpeg';
            type = '.jpeg';
        }
        const file = new File([blob], `${name}${i}${type}`, { type: imgType });
        formData.append(`images`, file);
      });
    }
    // 폼데이터 데이터 잘들어가나~ 확인!
    for (let x of (formData as FormData).entries()) {
      console.log(x);
    }
    return formData;
  }

  const handleSubitData = () => {
    console.log(onSubmit);
    switch (onSubmit?.postTypeInfo) {
      case 'ROOM_CREATE':
        // 해쉬태그가 있다면
        if (onSubmit.hashTag && onSubmit?.hashTag.join('').length > 0) {
          mutateCreateRoom({
            title: onSubmit.title as string,
            description: onSubmit.description as string,
            hashTag: onSubmit.hashTag as string[],
          });
          console.log('Chatroom : Hashtag Contained');
        }
        // 해쉬태그가 없다면
        else {
          mutateCreateRoom({
            title: onSubmit.title as string,
            description: onSubmit.description as string,
          });
          console.log('Chatroom : No Hashtag');
        }
        break;
      case 'POST_UPDATE':
        setPostId(onSubmit.postId as number);
        // 게시글 업데이트 이미지 없음
        if (onSubmit.images && (onSubmit.images === null || onSubmit.images.length === 0)) {
          mutateUpdatePost(
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
          mutateUpdatePost(
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
        break;
      case 'POST_CREATE':
        // 게시글 생성 이미지 없음
        if (onSubmit.images === null) {
          mutateCreatePost(
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
          mutateCreatePost(
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
        break;
      case 'ANSWER_CREATE':
        // 답변생성 이미지 없음
        if (onSubmit.images && onSubmit.images.length === 0) {
          mutateCreateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              postId: Number(onSubmit.postId) as number,
              content: onSubmit.content as string,
            })
          );
          console.log('Create Answer : No Image');
          // 답변생성 이미지 있음
        } else {
          mutateCreateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              postId: Number(onSubmit.postId) as number,
              content: onSubmit.content as string,
              images: onSubmit.images,
            })
          );
          console.log('Create Answer : Image Contained');
        }
        navigate(`/communityQADetail/${onSubmit.postId}`);
        break;
      case 'ANSWER_UPDATE':
        // 답변 업데이트 이미지 없음
        if (onSubmit.images && onSubmit.images.length === 0) {
          mutateCreateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              content: onSubmit.content as string,
              qnaAnswerId: onSubmit.qnaAnswerId as number,
            })
          );
          console.log('Update Answer : No Image');
          // 답변 업데이트 이미지 있음
        } else {
          mutateCreateQnaAnswer(
            toFormData({
              postTypeInfo: onSubmit.postTypeInfo as postingInfoType,
              content: onSubmit.content as string,
              qnaAnswerId: onSubmit.qnaAnswerId as number,
              images: onSubmit.images,
            })
          );
          console.log('Update Answer : Image Contained');
        }
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
