import { ChangeEvent, useRef, useState } from 'react';
import { handleFileImage } from '../../utils/handleChangeImgFile';
import { ChangeProfilePicPropsType } from './_MyProfileEdit.interface';
import { getRandomInt } from '../../utils/getRandomInt';
import { S3_URL } from '../../constant/union';

export default function ChangeProfilePic({ profileImg, setProfileImg, userInfo, setUserInfo }: ChangeProfilePicPropsType) {
  const [randomNum, setRandomNum] = useState(getRandomInt(1, 32) as number);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(3);

  const defaultImg = `profiles/basic/${randomNum}.png`;

  const imgRef = useRef<HTMLInputElement>(null);

  const handleProfileImgClick = () => {
    imgRef?.current?.click();
  };

  const handleDeletePreviewFile = () => {
    if (imgRef.current) {
      setProfileImg(S3_URL + defaultImg);
    }
  };

  async function urlToFile(url: string, filename?: string) {
    const response = await fetch(url);
    console.log(response);
    return await response.blob();
    // return new File([blob], filename, { type: 'image/png' });
  }

  const handleChangeProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const resultImage = await handleFileImage(e);
    setProfileImg(resultImage.url[0]);
    setUserInfo({ ...userInfo, file: resultImage.file[0] as Blob });
  };

  return (
    <>
      <div className="profile_img m-auto mt-4 h-[200px] w-[200px]">
        <input ref={imgRef} type="file" accept="image/*" onChange={(e) => handleChangeProfileImg(e)} className="hidden" />
        {profileImg && <img src={profileImg.toString()} className="pre-img absolute h-[200px] w-[200px] cursor-pointer rounded-[100px] object-cover" onClick={handleProfileImgClick} />}
      </div>
      <button
        className="flex items-center justify-center text-sm transition-all disabled:opacity-0"
        disabled={count === 0}
        onClick={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          setTimeout(async () => {
            setCount(count - 1);
            handleDeletePreviewFile();
            setRandomNum(getRandomInt(1, 32) as number);
            setIsLoading(false);
            const file = await urlToFile(profileImg as string);
            console.log(file);
            setUserInfo({ ...userInfo, file: file as Blob });
          }, 2000);
        }}
      >
        <p className="h-10 rounded-lg bg-greyBeige p-[0.25rem_0.75rem] text-[16px] font-semibold leading-8 transition-all hover:bg-darkIvory hover:text-white dark:bg-lightNavy hover:dark:bg-[#3D6374]">
          {isLoading ? '이미지 뽑는중..🎁' : `기본이미지 뽑기(${count}회)`}
        </p>
      </button>
    </>
  );
}
