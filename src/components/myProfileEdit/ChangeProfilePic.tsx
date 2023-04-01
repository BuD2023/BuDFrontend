import React, { ChangeEvent, useRef } from 'react';

const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
interface IChangeProfilePicPropsType {
  profileImg: string | ArrayBuffer | null;
  handleChangeProfileImg: (e: ChangeEvent<HTMLInputElement>) => void;
  setProfileImg: (x: string | ArrayBuffer | null) => void;
}

export default function ChangeProfilePic({ profileImg, handleChangeProfileImg, setProfileImg }: IChangeProfilePicPropsType) {
  const imgRef = useRef<HTMLInputElement>(null);

  const handleProfileImgClick = () => {
    imgRef?.current?.click();
  };

  const handleDeletePreviewFile = () => {
    if (imgRef.current) {
      setProfileImg(defaultImg);
    }
  };

  return (
    <>
      <div className="profile_img m-auto mt-4 h-[200px] w-[200px]">
        <input ref={imgRef} type="file" accept="image/*" onChange={handleChangeProfileImg} className="hidden" />
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
