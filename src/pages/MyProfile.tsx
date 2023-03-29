import { useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import MyProfileHeader from '../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../components/myProfile/MyProfileInfo';

export default function MyProfile() {
  const [postView, setPostView] = useState(true);

  return (
    <>
      <div className="relative mt-16 flex h-full min-h-screen w-full flex-col items-center gap-4 bg-darkNavy p-4 text-white">
        <MyProfileHeader />
        <MyProfileInfo />
        <div className="flex w-full justify-center">
          <div className="flex w-full items-center justify-around border border-darkNavy border-b-[#2F4658] font-semibold ">
            <div onClick={() => setPostView(true)} className={`w-[110px] cursor-pointer border border-darkNavy ${postView ? 'border-b-white' : 'opacity-50'}  bg-none py-5 text-center`}>
              게시글
            </div>
            <div onClick={() => setPostView(false)} className={`w-[110px] cursor-pointer border border-darkNavy ${!postView ? 'border-b-white' : 'opacity-50'}  bg-none py-5 text-center`}>
              스크랩
            </div>
          </div>
        </div>
        <PostFormat />
      </div>
      <FooterMenu />
    </>
  );
}