import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { handleFileImage } from '../../utils/handleChangeImgFile';
import { ChangeProfilePicPropsType } from './_MyProfileEdit.interface';
import { S3_URL } from '../../constant/union';
import { useGetRandomImageQuery } from '../../store/module/useMyProfileQuery';
import { makeCompressedImg } from '../../utils/makeCompressedImg';
import { urlToFile } from '../../utils/urlToFile';

export default function ChangeProfilePic({ profileImg, setProfileImg, userInfo, setUserInfo }: ChangeProfilePicPropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(3);

  const { data: randomImgQuery, refetch: newImg, isRefetching, isSuccess, isFetched } = useGetRandomImageQuery();

  const imgRef = useRef<HTMLInputElement>(null);

  const handleProfileImgClick = () => {
    imgRef?.current?.click();
  };

  useEffect(() => {
    (async () => {
      if (isSuccess && isFetched) {
        setProfileImg(S3_URL + randomImgQuery);
        setUserInfo({ ...userInfo, file: null });
      }
    })();
  }, [isRefetching, isSuccess]);

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
            await newImg();
            setCount(count - 1);
            setIsLoading(false);
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
