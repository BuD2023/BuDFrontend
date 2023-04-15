import { useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import PostFormat from '../components/common/PostFormat';
import ScrollToTopBtn from '../components/common/ScrollToTopBtn';
import MyProfileHeader from '../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../components/myProfile/MyProfileInfo';
import MyProfileMenu from '../components/myProfile/MyProfileMenu';
import { dummyData } from '../store/dummy';
import { useMyProfileQuery } from '../store/module/useMyProfileQuery';

export default function MyProfile() {
  const [postView, setPostView] = useState('feed');
  const resultData = [...dummyData];

  const { data, isLoading, error } = useMyProfileQuery();
  console.log(data);

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 pt-0 text-lightText dark:bg-darkNavy dark:text-white">
        <MyProfileHeader userId={data?.userId as string} nickName={data?.nickName as string} profileUrl={data?.profileUrl as string} description={data?.description as string} />
        <MyProfileInfo level={data?.level as number} followers={data?.numberOfFollowers as number} follows={data?.numberOfFollows as number} posts={data?.numberOfPosts as number} />
        <MyProfileMenu postView={postView} setPostView={setPostView} />
        {/* <PostFormat resultData={resultData} /> */}
      </div>
      <FooterMenu />
    </section>
  );
}
