import axios from 'axios';

interface IOnSubmitType {
  title: string;
  description: string;
  hashTag$set: boolean;
  hashTag$value: string[];
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

export default function MainBtn({ onSubmit, content, size }: IMainBtn) {
  const postChatRoom = async () => {
    try {
      const response = await axios({
        url: '/chatroom',
        method: 'post',
        data: onSubmit,
        baseURL: 'http://34.64.224.24:8080',
        //withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubitData = () => {
    console.log(onSubmit);
    postChatRoom();
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
