import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { accessToken } from '../../main';
import { useCreateRoomMutation } from '../../store/module/useCoffeeChatQuery';
import { usePostCommunityMutation, useUpdateCommunityMutation } from '../../store/module/useCommunityQuery';

interface IOnSubmitType {
  title: string;
  description: string;
  hashTag: string[];

  postId: string;
  content: string;
  postType: string;
  pic?: (string | ArrayBuffer | null)[];
  images?: null | FormData;

  profileImg: string | ArrayBuffer | null;
  nickName: string;
  selectedJob: string;
}

interface IMainBtn {
  content: string;
  size: number;
  onSubmit?: Partial<IOnSubmitType>;
}
const headers = {
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': `application/json`,
  withCredentials: true,
};

export default function MainBtn({ onSubmit, content, size }: IMainBtn) {
  const navigate = useNavigate();

  //reactQuery - mutation
  const { mutate: mutateCreateRoom } = useCreateRoomMutation();
  const { mutate: mutateCreatePost } = usePostCommunityMutation();
  const { mutate: mutateUpdatePost } = useUpdateCommunityMutation();

  // const createPost = async () => {
  //   try {
  //     const response = await axios({
  //       url: '/api/posts',
  //       method: 'post',
  //       headers: headers,
  //       data: JSON.stringify(onSubmit),
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubitData = () => {
    if (onSubmit?.content) {
      if (onSubmit?.postId) {
        if (onSubmit.images === null) {
          mutateUpdatePost({
            title: onSubmit.title as string,
            content: onSubmit.content as string,
            postType: onSubmit.postType as string,
          });
          console.log('이미지 없음');
        } else {
          mutateUpdatePost(
            onSubmit as {
              title: string;
              content: string;
              postType: string;
              images?: null | FormData;
            }
          );
          console.log('이미지 있음');
        }
        console.log(onSubmit);
      } else {
        if (onSubmit.images === null) {
          mutateCreatePost({
            title: onSubmit.title as string,
            content: onSubmit.content as string,
            postType: onSubmit.postType as string,
          });
        } else {
          mutateCreatePost(
            onSubmit as {
              title: string;
              content: string;
              postType: string;
              images?: null | FormData;
            }
          );
        }
      }
    }
    if (onSubmit?.description) {
      mutateCreateRoom(
        onSubmit as {
          title: string;
          description: string;
          hashTag?: string[];
        }
      );
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
