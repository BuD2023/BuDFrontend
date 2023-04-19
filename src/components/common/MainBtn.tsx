import { split, xor } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { postChatroomData } from '../../apiFetcher/coffeeChatInfo/postChatroom';
import { useCreateRoomMutation } from '../../store/module/useCoffeeChatQuery';
import { useCreateAnswerMutation } from '../../store/module/useCommunityDetailQuery';
import { usePostCommunityMutation, useUpdateCommunityMutation } from '../../store/module/useCommunityQuery';

interface IOnSubmitType {
  title: string;
  description: string;
  hashTag: string[];

  postId: string;
  content: string;
  postType: string;
  pic?: (string | ArrayBuffer | null)[];
  images?: Blob[];
  qnaAnswerId?: number;

  profileImg: string | ArrayBuffer | null;
  nickName: string;
  selectedJob: string;
}
interface IMainBtn {
  content: string;
  size: number;
  onSubmit?: Partial<IOnSubmitType>;
}

export default function MainBtn({ onSubmit, content, size }: IMainBtn) {
  const navigate = useNavigate();

  //reactQuery - mutation
  const { mutate: mutateCreateRoom } = useCreateRoomMutation();
  const { mutate: mutateCreatePost } = usePostCommunityMutation();
  const { mutate: mutateUpdatePost } = useUpdateCommunityMutation();
  const { mutate: mutateCreateQnaAnswer } = useCreateAnswerMutation();

  function toFormData(obj: Partial<IOnSubmitType>) {
    const formData = new FormData();
    const { images, ...rest } = obj;
    const blob = new Blob([JSON.stringify(rest)], { type: 'application/json' });
    formData.append('createPostRequest', blob);
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
    // 채팅방관련인지 VS 커뮤니티관련인지(게시글 or QNA답변)
    if (onSubmit?.content) {
      // 게시글인지 VS QNA 답변인지
      if (onSubmit.postType) {
        // 커뮤니티 게시글 create VS update
        if (onSubmit.postId) {
          // 게시글 업데이트 이미지 유 VS 무
          if (onSubmit.images === null) {
            mutateUpdatePost(
              toFormData({
                title: onSubmit.title as string,
                content: onSubmit.content as string,
                postType: onSubmit.postType as string,
              })
            );
            console.log('Post Update : No Image');
            // 게시글 업데이트 이미지 유
          } else {
            mutateUpdatePost(toFormData(onSubmit));
            console.log('Post Update : Image contained');
          }
          console.log(onSubmit);
          // 게시글 create
        } else {
          // 게시글 생성 이미지 유 VS 무
          if (onSubmit.images === null) {
            mutateCreatePost(
              toFormData({
                title: onSubmit.title as string,
                content: onSubmit.content as string,
                postType: onSubmit.postType as string,
              })
            );
            console.log('Post Create : No Image');
            // 게시글 생성 이미지 유
          } else {
            mutateCreatePost(toFormData(onSubmit));
            console.log('Post Create : Image contained');
          }
        }
        navigate('/community/all');
        // QNA 답변
      } else {
        // image 있는지 없는지
        if (onSubmit.images && onSubmit.images.length === 0) {
          // QNA 답변 Update
          if (onSubmit.qnaAnswerId) {
            mutateCreateQnaAnswer(
              toFormData({
                content: onSubmit.content as string,
                qnaAnswerId: onSubmit.qnaAnswerId as number,
              })
            );
            console.log('Update Answer : No Image');
            // QNA 답변 Create
          } else {
            mutateCreateQnaAnswer(
              toFormData({
                content: onSubmit.content as string,
              })
            );
            console.log('Create Answer : No Image');
            console.log(onSubmit.postId);
          }
          // image 없는 QNA 답변
        } else {
          mutateCreateQnaAnswer(toFormData(onSubmit));
          if (onSubmit.qnaAnswerId) {
            console.log('Update Answer : Image Contained');
          } else {
            console.log('Create Answer : Image Contained');
          }
        }
        navigate(`/communityQADetail/${onSubmit.postId}`);
      }
    }
    // 채팅방 생성
    if (onSubmit?.description) {
      // 해쉬태그가 있다면
      if (onSubmit.hashTag && onSubmit?.hashTag.join('').length > 0) {
        mutateCreateRoom(onSubmit as postChatroomData);
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
      navigate('/coffeeChat');
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
