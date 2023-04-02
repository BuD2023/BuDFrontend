import { useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import OtherProfileHeader from '../components/otherProfile/OtherProfileHeader';
import OtherProfileInfo from '../components/otherProfile/OtherProfileInfo';
import OtherProfileMenu from '../components/otherProfile/OtherProfileMenu';
import { dummyData } from '../store/dummy';

export default function OtherProfile() {
  const [postView, setPostView] = useState(true);
  const resultData = [...dummyData];

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <OtherProfileHeader />
        <OtherProfileInfo />
        <OtherProfileMenu postView={postView} setPostView={setPostView} />
        <PostFormat resultData={resultData} />
      </div>
      <FooterMenu />
    </>
  );
}
