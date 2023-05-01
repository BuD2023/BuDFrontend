import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { handleFileImage } from '../../utils/handleChangeImgFile';
import { ChangeProfilePicPropsType } from './_MyProfileEdit.interface';
import { S3_URL } from '../../constant/union';
import { useGetRandomImageMutation } from '../../store/module/useMyProfileQuery';
import { UserInfoEditInitialType } from '../../pages/profile/MyProfileEdit';

export default function ChangeProfilePic({ profileImg, setProfileImg, userInfo, setUserInfo, setPictureSet }: ChangeProfilePicPropsType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(3);

  const { data: randomImg, isSuccess, isLoading: isLoadingImg, refetch: newImgRefetch, isRefetching } = useGetRandomImageMutation();

  const imgRef = useRef<HTMLInputElement>(null);

  const handleProfileImgClick = () => {
    imgRef?.current?.click();
  };

  console.log(randomImg);
  useEffect(() => {
    (async () => {
      if (isSuccess && randomImg) {
        setProfileImg(S3_URL + randomImg);
        setUserInfo({ ...userInfo, file: randomImg as string });
      }
    })();
  }, [isLoadingImg, isSuccess, isRefetching]);

  const handleChangeProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const resultImage = await handleFileImage(e);
    setProfileImg(resultImage.url[0]);
    setUserInfo({ ...userInfo, file: resultImage.file[0] as Blob });
    setPictureSet && setPictureSet(true);
  };

  return (
    <>
      <div className="profile_img m-auto mt-4 h-[200px] w-[200px]">
        <input ref={imgRef} type="file" accept="image/*" onChange={(e) => handleChangeProfileImg(e)} className="hidden" />
        {profileImg && (
          <img src={profileImg.toString()} className="pre-img absolute h-[200px] w-[200px] cursor-pointer rounded-[100px] object-cover" onClick={handleProfileImgClick} alt={'profileImage'} />
        )}
      </div>
      <button
        className="flex items-center justify-center text-sm transition-all disabled:opacity-0"
        disabled={count === 0}
        onClick={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          setTimeout(async () => {
            await newImgRefetch();
            setPictureSet && setPictureSet(true);
            setCount(count - 1);
            setIsLoading(false);
          }, 2000);
        }}
      >
        <p className="flex h-12 items-center justify-center rounded-lg bg-greyBeige p-4 text-[16px] font-semibold leading-8 transition-all hover:bg-darkIvory hover:text-white dark:bg-lightNavy hover:dark:bg-[#3D6374]">
          {isLoading ? '이미지 뽑는중..🎁' : `랜덤 기본이미지 뽑기(${count}회)`}
        </p>
      </button>
    </>
  );
}
