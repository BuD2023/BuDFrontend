import axios from 'axios';
import { accessToken } from '../../pages/Home';

interface IOnSubmitType {
  title: string;
  description: string;
  hashTag: string[];

  content: string;
  pic: (string | ArrayBuffer | null)[];

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
const createPostData = {
  title: '이게 올라간다면?',
  content: '테스트용입니다',
  postType: 'FEED',
  imageUrl: 'imageUrl',
};

export default function MainBtn({ onSubmit, content, size }: IMainBtn) {
  const postChatRoom = async () => {
    try {
      const response = await axios({
        url: '/api/chatrooms',
        method: 'post',
        headers: headers,
        data: JSON.stringify(onSubmit),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    try {
      const response = await axios({
        url: '/api/community/post',
        method: 'post',
        headers: headers,
        data: JSON.stringify(createPostData),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubitData = () => {
    if (onSubmit?.content) createPost();
    if (onSubmit?.description) postChatRoom();
  };

  return (
    <button
      disabled={(onSubmit?.title?.trim().length === 0 || onSubmit?.description?.trim().length === 0) as boolean}
      onClick={handleSubitData}
      className={'flex cursor-pointer justify-center rounded-[50px] bg-greyBeige disabled:opacity-40 dark:bg-sky ' + `text-[${size}px]`}
    >
      <span className="px-5 py-2 font-bold">{content}</span>
    </button>
  );
}
