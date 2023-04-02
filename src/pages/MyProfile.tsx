import { useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import MyProfileHeader from '../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../components/myProfile/MyProfileInfo';
import MyProfileMenu from '../components/myProfile/MyProfileMenu';
import { dummyData } from '../store/dummy';

export default function MyProfile() {
  const [postView, setPostView] = useState(true);
  const resultData = [...dummyData];

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <MyProfileHeader />
        <MyProfileInfo />
        <MyProfileMenu postView={postView} setPostView={setPostView} />
        <PostFormat resultData={resultData} />
      </div>
      <FooterMenu />
    </>
  );
}
