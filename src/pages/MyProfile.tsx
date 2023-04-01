import { useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import MyProfileHeader from '../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../components/myProfile/MyProfileInfo';
import { dummyData } from '../store/dummy';

export default function MyProfile() {
  const [postView, setPostView] = useState(true);
  const resultData = [...dummyData];

  return (
    <>
      <div className="relative mt-16 flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <MyProfileHeader />
        <MyProfileInfo />
        <div className="flex w-full justify-center">
          <div className="flex w-full items-center justify-around border border-lightIvory border-b-darkIvory border-opacity-20 font-semibold dark:border-darkNavy dark:border-b-lightNavy ">
            <div
              onClick={() => setPostView(true)}
              className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${postView ? 'border-b-lightText dark:border-b-white' : 'opacity-50'}  bg-none py-5 text-center`}
            >
              게시글
            </div>
            <div
              onClick={() => setPostView(false)}
              className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${!postView ? 'border-b-lightText dark:border-b-white' : 'opacity-50'}  bg-none py-5 text-center`}
            >
              스크랩
            </div>
          </div>
        </div>
        <PostFormat resultData={resultData} />
      </div>
      <FooterMenu />
    </>
  );
}
