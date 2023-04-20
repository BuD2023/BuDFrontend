import imageCompression from 'browser-image-compression';
import { ChangeEvent, useRef } from 'react';
import { ChangeProfilePicPropsType } from './_MyProfileEdit.interface';

const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export default function ChangeProfilePic({ profileImg, setProfileImg }: ChangeProfilePicPropsType) {
  const imgRef = useRef<HTMLInputElement>(null);

  const handleProfileImgClick = () => {
    imgRef?.current?.click();
  };

  const handleDeletePreviewFile = () => {
    if (imgRef.current) {
      setProfileImg(defaultImg);
    }
  };

  const handleChangeProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      const options = {
        maxSizeMB: 0.1, // 허용하는 최대 사이즈 지정
        maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
        useWebWorker: true, // webworker 사용 여부
      };
      try {
        const compressedFile = await imageCompression(file, options);
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          setProfileImg(reader.result);
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="profile_img m-auto mt-4 h-[200px] w-[200px]">
        <input ref={imgRef} type="file" accept="image/*" onChange={(e) => handleChangeProfileImg(e)} className="hidden" />
        {profileImg && <img src={profileImg.toString()} className="pre-img absolute h-[200px] w-[200px] cursor-pointer rounded-[100px] object-cover" onClick={handleProfileImgClick} />}
      </div>
      <button
        className="flex items-center justify-center text-sm transition-all disabled:opacity-0"
        disabled={profileImg === defaultImg}
        onClick={(e) => {
          e.preventDefault();
          handleDeletePreviewFile();
        }}
      >
        <p className="h-10 rounded-lg bg-greyBeige p-[0.25rem_0.75rem] text-[16px] font-semibold leading-8 transition-all hover:bg-darkIvory hover:text-white dark:bg-lightNavy hover:dark:bg-[#3D6374]">
          기본 이미지로 변경
        </p>
      </button>
    </>
  );
}
